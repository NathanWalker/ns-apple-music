<template>
  <Page>
    <ActionBar title="Search" iosLargeTitle="true" />
    <ListView
      :items="items"
      showSearch="true"
      searchAutoHide="false"
      separatorColor="transparent"
      :iosEstimatedRowHeight="ALBUM_ROW_HEIGHT"
      @searchChange="onSearchChange"
    >
      <template #default="{ item }">
        <GridLayout>
          <!-- categoryRow -->
          <GridLayout
            v-if="item.kind === 'categoryRow'"
            columns="*, *"
            rows="*"
            height="104"
            class="px-5 pb-3"
          >
            <GridLayout
              col="0"
              height="92"
              borderRadius="10"
              :backgroundColor="item.pair[0].color"
              class="mr-2"
              verticalAlignment="top"
            >
              <Label
                :text="item.pair[0].label"
                class="text-lg font-bold p-3"
                color="#ffffff"
                verticalAlignment="top"
              />
            </GridLayout>
            <GridLayout
              v-if="item.pair[1]"
              col="1"
              height="92"
              borderRadius="10"
              :backgroundColor="item.pair[1].color"
              class="ml-2"
              verticalAlignment="top"
            >
              <Label
                :text="item.pair[1].label"
                class="text-lg font-bold p-3"
                color="#ffffff"
                verticalAlignment="top"
              />
            </GridLayout>
          </GridLayout>

          <!-- header -->
          <GridLayout
            v-if="item.kind === 'header'"
            height="44"
            verticalAlignment="bottom"
          >
            <Label
              :text="item.label"
              class="text-xl font-bold px-5 pb-1"
              :color="fg"
              verticalAlignment="bottom"
            />
          </GridLayout>

          <!-- album result -->
          <GridLayout
            v-if="item.kind === 'album'"
            columns="64, *, auto"
            rows="*"
            :height="ALBUM_ROW_HEIGHT"
            class="px-5"
            @tap="() => onAlbumTap(item.album)"
          >
            <ImageCacheIt
              col="0"
              :src="item.album.artwork"
              width="56"
              height="56"
              stretch="aspectFill"
              borderRadius="6"
              verticalAlignment="center"
              :sharedTransitionTag="albumArtTag(SEARCH_SECTION, item.album)"
            />
            <StackLayout col="1" verticalAlignment="center" class="pl-3">
              <Label
                :text="item.album.title"
                class="text-base"
                :color="fg"
                maxLines="1"
                textWrap="false"
              />
              <Label
                :text="'Album · ' + item.album.artist"
                class="text-sm"
                :color="muted"
                maxLines="1"
                textWrap="false"
              />
            </StackLayout>
            <Image
              col="2"
              src="sys://chevron.right"
              width="14"
              height="14"
              tintColor="#8e8e93"
              verticalAlignment="center"
            />
          </GridLayout>

          <!-- track result -->
          <GridLayout
            v-if="item.kind === 'track'"
            columns="64, *, auto"
            rows="*"
            height="72"
            class="px-5"
            @tap="() => playTrack(item.album, item.trackIndex)"
          >
            <ImageCacheIt
              col="0"
              :src="item.album.artwork"
              width="56"
              height="56"
              stretch="aspectFill"
              borderRadius="6"
              verticalAlignment="center"
            />
            <StackLayout col="1" verticalAlignment="center" class="pl-3">
              <Label
                :text="item.track.title"
                class="text-base"
                :color="fg"
                maxLines="1"
                textWrap="false"
              />
              <Label
                :text="'Song · ' + item.album.artist"
                class="text-sm"
                :color="muted"
                maxLines="1"
                textWrap="false"
              />
            </StackLayout>
            <Label
              col="2"
              :text="item.track.duration"
              class="text-sm"
              :color="muted"
              verticalAlignment="center"
            />
          </GridLayout>

          <!-- empty -->
          <GridLayout
            v-if="item.kind === 'empty'"
            height="120"
            verticalAlignment="center"
          >
            <Label
              :text="'No results for &quot;' + item.query + '&quot;'"
              class="text-base"
              :color="muted"
              horizontalAlignment="center"
              verticalAlignment="center"
            />
          </GridLayout>
        </GridLayout>
      </template>
    </ListView>
  </Page>
</template>

<script setup lang="ts">
import { computed, ref } from 'nativescript-vue';
import { albums, searchCategories, type Album, type Track } from '../music';
import { fg, muted } from '../appearance';
import { player } from '../player';
import { chunks } from '../chunks';
import { albumArtTag, openAlbum } from '../album-navigation';
import { openNowPlaying } from './NowPlaying';

const SEARCH_SECTION = 'search-results';
const ALBUM_ROW_HEIGHT = 72;

type Category = (typeof searchCategories)[number];
type CategoryRow = { kind: 'categoryRow'; pair: [Category, Category | undefined] };
type SectionHeader = { kind: 'header'; label: string };
type AlbumResult = { kind: 'album'; album: Album };
type TrackResult = { kind: 'track'; album: Album; track: Track; trackIndex: number };
type EmptyResult = { kind: 'empty'; query: string };
type SearchItem = CategoryRow | SectionHeader | AlbumResult | TrackResult | EmptyResult;

const query = ref('');

const items = computed<SearchItem[]>(() => {
  const q = query.value.trim().toLowerCase();
  if (!q) {
    return chunks(searchCategories, 2).map(
      (pair) =>
        ({
          kind: 'categoryRow',
          pair: [pair[0], pair[1]] as [Category, Category | undefined],
        }) as SearchItem
    );
  }

  const matchedAlbums = albums.filter(
    (a) => a.title.toLowerCase().includes(q) || a.artist.toLowerCase().includes(q)
  );
  const matchedTracks: TrackResult[] = [];
  for (const album of albums) {
    album.tracks.forEach((track, i) => {
      if (track.title.toLowerCase().includes(q)) {
        matchedTracks.push({ kind: 'track', album, track, trackIndex: i });
      }
    });
  }

  const result: SearchItem[] = [];
  if (matchedAlbums.length) {
    result.push({ kind: 'header', label: 'Albums' });
    for (const album of matchedAlbums) {
      result.push({ kind: 'album', album });
    }
  }
  if (matchedTracks.length) {
    result.push({ kind: 'header', label: 'Songs' });
    result.push(...matchedTracks);
  }
  if (!result.length) {
    result.push({ kind: 'empty', query: query.value.trim() });
  }
  return result;
});

function onSearchChange(args: any) {
  query.value = args?.data?.text ?? args?.text ?? args?.object?.text ?? '';
}

function onAlbumTap(album: Album) {
  openAlbum(album, SEARCH_SECTION);
}

function playTrack(album: Album, trackIndex: number) {
  player.playAlbum(album, trackIndex);
  openNowPlaying();
}
</script>
