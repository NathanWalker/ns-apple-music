<template>
  <GridLayout
    columns="48, *, 36, 36"
    rows="48"
    padding="0 12"
    verticalAlignment="center"
    @tap="open"
  >
    <ImageCacheIt
      col="0"
      :src="currentAlbum.artwork"
      width="32"
      height="32"
      stretch="aspectFill"
      borderRadius="5"
      verticalAlignment="center"
      sharedTransitionTag="albumArt"
    />
    <StackLayout col="1" verticalAlignment="center" padding="0 0 0 4">
      <Label
        :text="currentTrack.title"
        :color="fg"
        fontSize="15"
        fontWeight="600"
        maxLines="1"
        textWrap="false"
      />
      <Label
        :text="currentAlbum.artist"
        :color="muted"
        fontSize="13"
        maxLines="1"
        textWrap="false"
      />
    </StackLayout>
    <Image
      col="2"
      :src="isPlaying ? 'sys://pause.fill' : 'sys://play.fill'"
      width="20"
      height="20"
      stretch="aspectFit"
      :tintColor="fg"
      verticalAlignment="center"
      horizontalAlignment="center"
      @tap="togglePlay"
    />
    <Image
      col="3"
      src="sys://forward.fill"
      width="20"
      height="20"
      stretch="aspectFit"
      :tintColor="fg"
      verticalAlignment="center"
      horizontalAlignment="center"
      @tap="skipForward"
    />
  </GridLayout>
</template>

<script setup lang="ts">
import { player } from '../player';
import { fg, muted } from '../appearance';
import { openNowPlaying } from '../screens/NowPlaying';

const currentAlbum = player.currentAlbum;
const currentTrack = player.currentTrack;
const isPlaying = player.isPlaying;

const togglePlay = () => player.togglePlay();
const skipForward = () => player.skipForward();

function open() {
  openNowPlaying();
}
</script>
