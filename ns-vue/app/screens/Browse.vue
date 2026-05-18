<template>
  <Page>
    <ActionBar title="New" iosLargeTitle="true">
      <ActionItem icon="sys://person.crop.circle.fill" @loaded="setRightPos" />
    </ActionBar>
    <ScrollView iosContentInsetAdjustmentBehavior="automatic">
      <StackLayout class="pb-32">
        <StackLayout class="px-5 pt-3">
          <GridLayout
            rows="*"
            columns="*"
            borderRadius="14"
            class="overflow-hidden"
            @tap="() => openAlbum(hero, HERO)"
          >
            <ImageCacheIt
              :src="hero.artwork"
              stretch="aspectFill"
              height="320"
              borderRadius="14"
              :sharedTransitionTag="albumArtTag(HERO, hero)"
            />
            <StackLayout verticalAlignment="bottom" class="p-4">
              <Label text="NEW RELEASE" class="text-xs font-bold" color="#ffffff" opacity="0.85" />
              <Label :text="hero.title" class="text-3xl font-bold" color="#ffffff" />
              <Label :text="hero.artist" class="text-base" color="#ffffff" opacity="0.85" />
            </StackLayout>
          </GridLayout>
        </StackLayout>

        <Label text="Hot Tracks" class="text-2xl font-bold px-5 pt-7 pb-2" :color="fg" />
        <GridLayout
          v-for="(pair, idx) in pairs"
          :key="pair[0].id"
          columns="*, *"
          rows="auto"
          class="px-5 pb-3"
        >
          <StackLayout col="0" class="pr-2" @tap="() => openAlbum(pair[0], HOT_TRACKS)">
            <ImageCacheIt
              :src="pair[0].artwork"
              stretch="aspectFill"
              height="170"
              borderRadius="10"
              :sharedTransitionTag="albumArtTag(HOT_TRACKS, pair[0])"
            />
            <Label :text="pair[0].title" class="text-base pt-2" :color="fg" maxLines="1" textWrap="false" />
            <Label :text="pair[0].artist" class="text-sm" :color="muted" maxLines="1" textWrap="false" />
          </StackLayout>
          <StackLayout
            v-if="pair[1]"
            col="1"
            class="pl-2"
            @tap="() => openAlbum(pair[1]!, HOT_TRACKS)"
          >
            <ImageCacheIt
              :src="pair[1].artwork"
              stretch="aspectFill"
              height="170"
              borderRadius="10"
              :sharedTransitionTag="albumArtTag(HOT_TRACKS, pair[1])"
            />
            <Label :text="pair[1].title" class="text-base pt-2" :color="fg" maxLines="1" textWrap="false" />
            <Label :text="pair[1].artist" class="text-sm" :color="muted" maxLines="1" textWrap="false" />
          </StackLayout>
        </GridLayout>
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script setup lang="ts">
import { newReleases, type Album } from '../music';
import { fg, muted } from '../appearance';
import { chunks } from '../chunks';
import { albumArtTag, openAlbum } from '../album-navigation';

const HERO = 'browse-hero';
const HOT_TRACKS = 'browse-hot-tracks';

const hero: Album = newReleases[0];
const pairs: Album[][] = chunks(newReleases.slice(1), 2);

function setRightPos(args: any) {
  const obj = args?.object;
  if (obj?.ios) obj.ios.position = 'right';
}
</script>
