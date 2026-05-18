<template>
  <Page :actionBarHidden="true" :backgroundColor="bgColor">
    <GridLayout rows="*">
      <!-- Vibrant gradient backdrop based on the album accent -->
      <GridLayout
        :backgroundColor="currentAlbum.accent"
        :backgroundImage="bgImage"
      />

      <ScrollView>
        <StackLayout class="px-6 pb-10">
          <!-- Drag handle / close -->
          <GridLayout
            class="pt-3 pb-3"
            horizontalAlignment="center"
            @tap="close"
          >
            <GridLayout
              width="40"
              height="5"
              borderRadius="3"
              backgroundColor="#ffffff"
              opacity="0.4"
            />
          </GridLayout>

          <!-- Artwork -->
          <GridLayout horizontalAlignment="center" class="pt-6">
            <ImageCacheIt
              :src="currentAlbum.artwork"
              width="320"
              height="320"
              stretch="aspectFill"
              borderRadius="14"
              sharedTransitionTag="albumArt"
            />
          </GridLayout>

          <!-- Title block -->
          <GridLayout columns="*, auto" rows="auto" class="pt-7">
            <StackLayout col="0">
              <Label
                :text="currentTrack.title"
                class="on-image text-2xl font-bold text-white"
                maxLines="1"
                textWrap="false"
              />
              <Label
                :text="currentAlbum.artist"
                class="on-image text-lg text-white"
                opacity="0.75"
                maxLines="1"
                textWrap="false"
              />
            </StackLayout>
            <Image
              col="1"
              src="sys://ellipsis.circle.fill"
              width="32"
              height="32"
              tintColor="#ffffff"
              opacity="0.7"
              verticalAlignment="center"
              :menu="ellipsisMenu"
              @selected="onMenuSelected"
            />
          </GridLayout>

          <!-- Progress -->
          <GridLayout rows="auto, auto" class="pt-5">
            <GridLayout
              row="0"
              height="4"
              borderRadius="2"
              opacity="0.25"
              class="bg-white"
            >
              <GridLayout
                horizontalAlignment="left"
                :width="progressWidth"
                class="bg-white"
                height="4"
                borderRadius="2"
              />
            </GridLayout>
            <GridLayout row="1" columns="*, auto" class="pt-2">
              <Label
                col="0"
                text="1:23"
                class="on-image text-xs text-white"
                opacity="0.6"
              />
              <Label
                col="1"
                text="-2:45"
                class="on-image text-xs text-white"
                opacity="0.6"
              />
            </GridLayout>
          </GridLayout>

          <!-- Playback controls -->
          <GridLayout
            columns="*, *, *"
            rows="auto"
            class="pt-7"
            horizontalAlignment="center"
          >
            <Image
              col="0"
              src="sys://backward.fill"
              width="36"
              height="36"
              tintColor="#ffffff"
              stretch="aspectFit"
              @tap="player.skipBackward()"
            />
            <Image
              col="1"
              :src="isPlaying ? 'sys://pause.fill' : 'sys://play.fill'"
              width="56"
              height="56"
              tintColor="#ffffff"
              stretch="aspectFit"
              class="px-10"
              @tap="player.togglePlay()"
            />
            <Image
              col="2"
              src="sys://forward.fill"
              width="36"
              height="36"
              tintColor="#ffffff"
              stretch="aspectFit"
              @tap="player.skipForward()"
            />
          </GridLayout>

          <!-- Volume -->
          <GridLayout columns="auto, *, auto" rows="auto" class="pt-8">
            <Image
              col="0"
              src="sys://speaker.fill"
              width="16"
              height="16"
              tintColor="#ffffff"
              opacity="0.6"
              verticalAlignment="center"
            />
            <GridLayout
              col="1"
              height="4"
              borderRadius="2"
              backgroundColor="#ffffff"
              opacity="0.25"
              class="mx-3"
              verticalAlignment="center"
            >
              <GridLayout
                horizontalAlignment="left"
                width="55%"
                height="4"
                borderRadius="2"
                backgroundColor="#ffffff"
              />
            </GridLayout>
            <Image
              col="2"
              src="sys://speaker.wave.3.fill"
              width="20"
              height="20"
              tintColor="#ffffff"
              opacity="0.6"
              verticalAlignment="center"
            />
          </GridLayout>
        </StackLayout>
      </ScrollView>
    </GridLayout>
  </Page>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance } from 'nativescript-vue';
import { Color } from '@nativescript/core';
import type { MenuAction } from '@nstudio/nativescript-menu';
import { player } from '../player';

function darken(hex: string, amount = 0.35): string {
  const c = new Color(hex);
  const r = Math.max(0, Math.floor(c.r * (1 - amount)));
  const g = Math.max(0, Math.floor(c.g * (1 - amount)));
  const b = Math.max(0, Math.floor(c.b * (1 - amount)));
  return new Color(255, r, g, b).hex;
}

const currentAlbum = player.currentAlbum;
const currentTrack = player.currentTrack;
const isPlaying = player.isPlaying;
const progress = player.progress;

const bgColor = computed(() => currentAlbum.value.accent);
const bgImage = computed(() => {
  const accent = currentAlbum.value.accent;
  return `linear-gradient(180deg, ${accent} 0%, ${darken(accent, 0.65)} 100%)`;
});
const progressWidth = computed(() => Math.round(progress.value * 100) + '%');

const ellipsisMenu = computed<MenuAction[]>(() => [
  {
    name: '',
    childrenStyle: 'palette',
    children: [
      { id: 1, name: 'Love', icon: 'heart' },
      { id: 2, name: 'Suggest Less', icon: 'hand.thumbsdown' },
      { id: 3, name: 'Share Song', icon: 'square.and.arrow.up' },
    ],
  },
  { id: 4, name: 'Add to Library', icon: 'plus' },
  { id: 5, name: 'Add to a Playlist', icon: 'text.badge.plus' },
  { id: 6, name: 'Create Station', icon: 'badge.plus.radiowaves.right' },
  {
    id: 7,
    name: 'Go to Album',
    subtitle: currentAlbum.value.title,
    icon: 'square.stack',
  },
  {
    id: 8,
    name: 'Go to Artist',
    subtitle: currentAlbum.value.artist,
    icon: 'music.mic',
  },
  { id: 9, name: 'View Full Lyrics', icon: 'quote.bubble' },
  { id: 10, name: 'Share Lyrics', icon: 'text.bubble' },
  { id: 11, name: 'Sleep Timer', icon: 'moon.zzz' },
  {
    id: 12,
    name: 'Report a Concern',
    icon: 'exclamationmark.bubble',
    destructive: true,
  },
]);

const instance = getCurrentInstance();

function close() {
  (instance?.proxy as any)?.$closeModal?.();
}

function onMenuSelected(args: any) {
  console.log('menu selected:', args?.data?.option?.name);
}
</script>
