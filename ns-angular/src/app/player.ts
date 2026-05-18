import { signal, computed } from '@angular/core';
import { Album, Track, albums } from './music';

const currentAlbum = signal<Album>(albums[0]);
const currentTrackIndex = signal(0);
const isPlaying = signal(true);
const progress = signal(0.34);

const currentTrack = computed<Track>(
  () => currentAlbum().tracks[currentTrackIndex()] ?? currentAlbum().tracks[0]
);

const togglePlay = () => isPlaying.update((p) => !p);

const skipForward = () => {
  const album = currentAlbum();
  currentTrackIndex.update((i) => (i + 1) % album.tracks.length);
  progress.set(0);
  isPlaying.set(true);
};

const skipBackward = () => {
  const album = currentAlbum();
  currentTrackIndex.update((i) => (i - 1 + album.tracks.length) % album.tracks.length);
  progress.set(0);
  isPlaying.set(true);
};

const playAlbum = (album: Album, trackIndex = 0) => {
  currentAlbum.set(album);
  currentTrackIndex.set(trackIndex);
  progress.set(0);
  isPlaying.set(true);
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
  setProgress: (v: number) => progress.set(v),
};
