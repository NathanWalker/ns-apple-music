<template>
  <Page>
    <ActionBar title="Library" iosLargeTitle="true">
      <ActionItem icon="sys://person.crop.circle.fill" @loaded="setRightPos" />
    </ActionBar>
    <ScrollView iosContentInsetAdjustmentBehavior="automatic">
      <StackLayout class="pb-32">
        <StackLayout iosIgnoreSafeArea="true" class="pt-4">
          <GridLayout
            v-for="section in librarySections"
            :key="section.id"
            columns="32, *, auto"
            rows="auto"
            class="px-5"
            height="50"
          >
            <Image col="0" :src="section.icon" width="22" height="22" tintColor="#ff375f" verticalAlignment="center" horizontalAlignment="left" />
            <Label col="1" :text="section.label" class="text-lg pl-3" :color="fg" verticalAlignment="center" />
            <Image col="2" src="sys://chevron.right" width="14" height="14" tintColor="#8e8e93" verticalAlignment="center" />
          </GridLayout>
        </StackLayout>

        <Label text="Recently Added" class="text-2xl font-bold px-5 pt-7 pb-2" :color="fg" />
        <GridLayout
          v-for="pair in recentPairs"
          :key="pair[0].id"
          columns="*, *"
          rows="auto"
          class="px-5 pb-3"
        >
          <StackLayout col="0" class="pr-2" @tap="() => openAlbum(pair[0], RECENT)">
            <ImageCacheIt
              :src="pair[0].artwork"
              stretch="aspectFill"
              height="170"
              borderRadius="10"
              :sharedTransitionTag="albumArtTag(RECENT, pair[0])"
            />
            <Label :text="pair[0].title" class="text-base pt-2" :color="fg" maxLines="1" textWrap="false" />
            <Label :text="pair[0].artist" class="text-sm" :color="muted" maxLines="1" textWrap="false" />
          </StackLayout>
          <StackLayout
            v-if="pair[1]"
            col="1"
            class="pl-2"
            @tap="() => openAlbum(pair[1]!, RECENT)"
          >
            <ImageCacheIt
              :src="pair[1].artwork"
              stretch="aspectFill"
              height="170"
              borderRadius="10"
              :sharedTransitionTag="albumArtTag(RECENT, pair[1])"
            />
            <Label :text="pair[1].title" class="text-base pt-2" :color="fg" maxLines="1" textWrap="false" />
            <Label :text="pair[1].artist" class="text-sm" :color="muted" maxLines="1" textWrap="false" />
          </StackLayout>
        </GridLayout>

        <Label text="Playlists" class="text-2xl font-bold px-5 pt-7 pb-1" :color="fg" />
        <StackLayout class="px-5">
          <GridLayout
            v-for="pl in playlists"
            :key="pl.id"
            columns="64, *, auto"
            rows="auto"
            class="py-2"
          >
            <ImageCacheIt col="0" :src="pl.artwork" width="56" height="56" stretch="aspectFill" borderRadius="6" />
            <StackLayout col="1" verticalAlignment="center" class="pl-3">
              <Label :text="pl.title" class="text-base" :color="fg" maxLines="1" textWrap="false" />
              <Label :text="pl.curator" class="text-sm" :color="muted" maxLines="1" textWrap="false" />
            </StackLayout>
            <Image col="2" src="sys://chevron.right" width="14" height="14" tintColor="#8e8e93" verticalAlignment="center" />
          </GridLayout>
        </StackLayout>
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script setup lang="ts">
import { librarySections, playlists, recentlyPlayed, type Album } from '../music';
import { fg, muted } from '../appearance';
import { chunks } from '../chunks';
import { albumArtTag, openAlbum } from '../album-navigation';

const RECENT = 'library-recently-added';
const recentPairs: Album[][] = chunks(recentlyPlayed.slice(0, 4), 2);

function setRightPos(args: any) {
  const obj = args?.object;
  if (obj?.ios) obj.ios.position = 'right';
}
</script>
