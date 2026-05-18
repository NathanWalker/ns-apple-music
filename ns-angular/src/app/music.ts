export type Track = {
  title: string
  duration: string
}

export type Album = {
  id: string
  title: string
  artist: string
  year: string
  artwork: string
  accent: string
  tagline?: string
  tracks: Track[]
}

export const albums: Album[] = [
  {
    id: 'midnight-main',
    title: 'Midnight Reverie',
    artist: 'Aether Lane',
    year: '2025',
    accent: '#5B6CFF',
    artwork: '~/assets/album-midnight.jpg',
    tagline: 'A late-night journey through synthwave horizons.',
    tracks: [
      { title: 'Neon Pulse', duration: '3:42' },
      { title: 'Sapphire Drift', duration: '4:11' },
      { title: 'Velvet Skyline', duration: '3:28' },
      { title: 'After Hours', duration: '5:02' },
      { title: 'Echoes of Tomorrow', duration: '4:36' },
      { title: 'Midnight Reverie', duration: '6:14' },
    ],
  },
  {
    id: 'midnight',
    title: 'Midnight Reverie',
    artist: 'Aether Lane',
    year: '2025',
    accent: '#5B6CFF',
    artwork: '~/assets/album-midnight.jpg',
    tagline: 'A late-night journey through synthwave horizons.',
    tracks: [
      { title: 'Neon Pulse', duration: '3:42' },
      { title: 'Sapphire Drift', duration: '4:11' },
      { title: 'Velvet Skyline', duration: '3:28' },
      { title: 'After Hours', duration: '5:02' },
      { title: 'Echoes of Tomorrow', duration: '4:36' },
      { title: 'Midnight Reverie', duration: '6:14' },
    ],
  },
  {
    id: 'neon',
    title: 'Neon Cathedral',
    artist: 'Lumen Choir',
    year: '2024',
    accent: '#FF4F8B',
    artwork: '~/assets/album-neon.jpg',
    tagline: 'Hymns rewritten for the digital age.',
    tracks: [
      { title: 'Glass Spire', duration: '4:22' },
      { title: 'Holy Frequencies', duration: '3:58' },
      { title: 'Stained Light', duration: '5:11' },
      { title: 'Cathedral, Burning', duration: '4:47' },
    ],
  },
  {
    id: 'sunset',
    title: 'Sunset Theory',
    artist: 'Halcyon Bay',
    year: '2024',
    accent: '#FF8A3D',
    artwork: '~/assets/album-sunset.jpg',
    tagline: 'Warm guitars for golden hours.',
    tracks: [
      { title: 'Bay Breeze', duration: '3:31' },
      { title: 'Lagoon Letters', duration: '4:08' },
      { title: 'Postcards from July', duration: '3:55' },
      { title: 'Sunset Theory', duration: '4:43' },
      { title: 'Tides That Forget', duration: '5:19' },
    ],
  },
  {
    id: 'retro',
    title: 'Cassette Future',
    artist: 'Static Bloom',
    year: '2023',
    accent: '#FFC93A',
    artwork: '~/assets/album-retro.jpg',
    tracks: [
      { title: 'Tape Hiss Romance', duration: '3:12' },
      { title: 'Magnetic North', duration: '4:01' },
      { title: 'Side B Lullaby', duration: '3:44' },
    ],
  },
  {
    id: 'velvet',
    title: 'Velvet Hour',
    artist: 'Marlowe Quintet',
    year: '2025',
    accent: '#7A55D4',
    artwork: '~/assets/album-velvet.jpg',
    tracks: [
      { title: 'Slow Burn', duration: '5:24' },
      { title: 'Smoke & Brass', duration: '6:02' },
      { title: 'Velvet Hour', duration: '7:11' },
    ],
  },
  {
    id: 'pulse',
    title: 'Pulse Protocol',
    artist: 'Vex.AI',
    year: '2025',
    accent: '#22D3EE',
    artwork: '~/assets/album-pulse.jpg',
    tracks: [
      { title: 'Cold Boot', duration: '3:05' },
      { title: 'Handshake', duration: '4:18' },
      { title: 'Latency', duration: '3:47' },
      { title: 'Protocol Zero', duration: '5:55' },
    ],
  },
  {
    id: 'echo',
    title: 'Echo Chamber',
    artist: 'Solene & The Voids',
    year: '2024',
    accent: '#34D399',
    artwork: '~/assets/album-echo.jpg',
    tracks: [
      { title: 'Reverb Heart', duration: '4:09' },
      { title: 'Empty Rooms', duration: '3:51' },
      { title: 'Echo Chamber', duration: '6:23' },
    ],
  },
  {
    id: 'dream',
    title: 'Dream Tape',
    artist: 'Polar Bloom',
    year: '2023',
    accent: '#F472B6',
    artwork: '~/assets/album-dream.jpg',
    tracks: [
      { title: 'Lucid', duration: '3:33' },
      { title: 'Sleep Cycle', duration: '4:44' },
      { title: 'Dream Tape', duration: '5:12' },
    ],
  },
  {
    id: 'lunar',
    title: 'Lunar Drift',
    artist: 'North Frequency',
    year: '2024',
    accent: '#9CA3FF',
    artwork: '~/assets/album-lunar.jpg',
    tracks: [
      { title: 'Crater Light', duration: '3:48' },
      { title: 'Lunar Drift', duration: '5:36' },
      { title: 'Sea of Tranquility', duration: '4:14' },
    ],
  },
  {
    id: 'prism',
    title: 'Prism Heart',
    artist: 'Iridia',
    year: '2025',
    accent: '#FB7185',
    artwork: '~/assets/album-prism.jpg',
    tracks: [
      { title: 'Refraction', duration: '4:01' },
      { title: 'Spectral', duration: '3:39' },
      { title: 'Prism Heart', duration: '5:08' },
    ],
  },
  {
    id: 'aurora',
    title: 'Aurora Sessions',
    artist: 'Kara Sumi',
    year: '2024',
    accent: '#38BDF8',
    artwork: '~/assets/album-aurora.jpg',
    tracks: [
      { title: 'Borealis', duration: '4:27' },
      { title: 'Iceline', duration: '3:54' },
      { title: 'Aurora Sessions', duration: '6:31' },
    ],
  },
  {
    id: 'ember',
    title: 'Ember Letters',
    artist: 'The Westerlies',
    year: '2023',
    accent: '#F97316',
    artwork: '~/assets/album-ember.jpg',
    tracks: [
      { title: 'Slowburn', duration: '4:14' },
      { title: 'Ash & Ink', duration: '3:46' },
      { title: 'Ember Letters', duration: '5:02' },
    ],
  },
  {
    id: 'mosaic',
    title: 'Mosaic',
    artist: 'Linnea Voss',
    year: '2025',
    accent: '#A78BFA',
    artwork: '~/assets/album-mosaic.jpg',
    tracks: [
      { title: 'Tessera', duration: '3:21' },
      { title: 'Cobalt Tile', duration: '4:09' },
      { title: 'Mosaic', duration: '5:48' },
    ],
  },
  {
    id: 'horizon',
    title: 'Horizon Tape',
    artist: 'Coastline Echo',
    year: '2024',
    accent: '#14B8A6',
    artwork: '~/assets/album-horizon.jpg',
    tracks: [
      { title: 'Drift Coast', duration: '3:58' },
      { title: 'Salt & Static', duration: '4:21' },
      { title: 'Horizon Tape', duration: '5:34' },
    ],
  },
  {
    id: 'cinder',
    title: 'Cinder & Glass',
    artist: 'Hollow Crown',
    year: '2025',
    accent: '#EF4444',
    artwork: '~/assets/album-cinder.jpg',
    tracks: [
      { title: 'Burnline', duration: '3:47' },
      { title: 'Glass Bones', duration: '4:33' },
      { title: 'Cinder & Glass', duration: '5:51' },
    ],
  },
]

export const albumById = (id: string): Album =>
  albums.find((a) => a.id === id) ?? albums[0]

export const topPicks = ['midnight-main', 'midnight', 'neon', 'sunset', 'velvet', 'pulse'].map(albumById)
export const newReleases = ['cinder', 'mosaic', 'prism', 'aurora', 'ember', 'horizon'].map(albumById)
export const recentlyPlayed = ['echo', 'dream', 'lunar', 'retro', 'midnight', 'sunset'].map(albumById)
export const madeForYou = ['velvet', 'aurora', 'pulse', 'mosaic'].map(albumById)

export type RadioStation = {
  id: string
  title: string
  subtitle: string
  artwork: string
  accent: string
}

export const radioStations: RadioStation[] = [
  { id: 'hits1', title: 'Hits Radio', subtitle: 'Today\'s biggest songs', artwork: '~/assets/album-neon.jpg', accent: '#FF375F' },
  { id: 'chill1', title: 'Late Night Lounge', subtitle: 'Chill the night away', artwork: '~/assets/album-midnight.jpg', accent: '#5B6CFF' },
  { id: 'pop1', title: 'Pop Spotlight', subtitle: 'Pop, all hours', artwork: '~/assets/album-prism.jpg', accent: '#FB7185' },
  { id: 'classic1', title: 'Classical Hour', subtitle: 'Strings & silence', artwork: '~/assets/album-velvet.jpg', accent: '#7A55D4' },
]

export type Playlist = {
  id: string
  title: string
  curator: string
  artwork: string
}

export const playlists: Playlist[] = [
  { id: 'pl1', title: 'Late Night Drives', curator: 'Made for You', artwork: '~/assets/album-midnight.jpg' },
  { id: 'pl2', title: 'Focus Flow', curator: 'Made for You', artwork: '~/assets/album-aurora.jpg' },
  { id: 'pl3', title: 'Sunset Sessions', curator: 'Halcyon Bay', artwork: '~/assets/album-sunset.jpg' },
  { id: 'pl4', title: 'Neon Sundays', curator: 'Hits Radio', artwork: '~/assets/album-neon.jpg' },
  { id: 'pl5', title: 'Velvet Mood', curator: 'Marlowe Quintet', artwork: '~/assets/album-velvet.jpg' },
]

export const librarySections = [
  { id: 'playlists', label: 'Playlists', icon: 'sys://music.note.list' },
  { id: 'artists', label: 'Artists', icon: 'sys://music.mic' },
  { id: 'albums', label: 'Albums', icon: 'sys://square.stack.fill' },
  { id: 'songs', label: 'Songs', icon: 'sys://music.note' },
  { id: 'downloaded', label: 'Downloaded', icon: 'sys://arrow.down.circle' },
]

export const searchCategories = [
  { id: 'pop', label: 'Pop', color: '#FF4F8B' },
  { id: 'hip-hop', label: 'Hip-Hop', color: '#F97316' },
  { id: 'rock', label: 'Rock', color: '#EF4444' },
  { id: 'electronic', label: 'Electronic', color: '#22D3EE' },
  { id: 'indie', label: 'Indie', color: '#A78BFA' },
  { id: 'jazz', label: 'Jazz', color: '#7A55D4' },
  { id: 'classical', label: 'Classical', color: '#34D399' },
  { id: 'rnb', label: 'R&B', color: '#FB7185' },
]
