import { createSignal } from 'solid-js'
import { Album, Track, albums } from '../data/music'

const [currentAlbum, setCurrentAlbum] = createSignal<Album>(albums[0])
const [currentTrackIndex, setCurrentTrackIndex] = createSignal(0)
const [isPlaying, setIsPlaying] = createSignal(true)
const [progress, setProgress] = createSignal(0.34)

const currentTrack = (): Track => currentAlbum().tracks[currentTrackIndex()] ?? currentAlbum().tracks[0]

const togglePlay = () => setIsPlaying((p) => !p)

const skipForward = () => {
  const album = currentAlbum()
  setCurrentTrackIndex((i) => (i + 1) % album.tracks.length)
  setProgress(0)
  setIsPlaying(true)
}

const skipBackward = () => {
  const album = currentAlbum()
  setCurrentTrackIndex((i) => (i - 1 + album.tracks.length) % album.tracks.length)
  setProgress(0)
  setIsPlaying(true)
}

const playAlbum = (album: Album, trackIndex = 0) => {
  setCurrentAlbum(album)
  setCurrentTrackIndex(trackIndex)
  setProgress(0)
  setIsPlaying(true)
}

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
  setProgress,
}
