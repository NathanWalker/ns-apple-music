import { ref, computed } from 'nativescript-vue';
import { Album, Track, albums } from './music';

const currentAlbum = ref<Album>(albums[0]);
const currentTrackIndex = ref(0);
const isPlaying = ref(true);
const progress = ref(0.34);

const currentTrack = computed<Track>(
  () => currentAlbum.value.tracks[currentTrackIndex.value] ?? currentAlbum.value.tracks[0]
);

const togglePlay = () => {
  isPlaying.value = !isPlaying.value;
};

const skipForward = () => {
  const album = currentAlbum.value;
  currentTrackIndex.value = (currentTrackIndex.value + 1) % album.tracks.length;
  progress.value = 0;
  isPlaying.value = true;
};

const skipBackward = () => {
  const album = currentAlbum.value;
  currentTrackIndex.value = (currentTrackIndex.value - 1 + album.tracks.length) % album.tracks.length;
  progress.value = 0;
  isPlaying.value = true;
};

const playAlbum = (album: Album, trackIndex = 0) => {
  currentAlbum.value = album;
  currentTrackIndex.value = trackIndex;
  progress.value = 0;
  isPlaying.value = true;
};

export const player = {
  currentAlbum,
  currentTrack,
  currentTrackIndex,
  isPlaying,
  progress,
  togglePlay,
  skipForward,
  skipBackward,
  playAlbum,
  setProgress: (v: number) => {
    progress.value = v;
  },
};
