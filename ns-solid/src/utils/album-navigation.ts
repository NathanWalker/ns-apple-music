import { PageTransition, SharedTransition } from '@nativescript/core'
import type { useRouter } from 'solid-navigation'
import type { Album } from '../data/music'
import { player } from '../state/player'

type Router = ReturnType<typeof useRouter>

export function albumArtTag(section: string, album: Album): string {
  return `albumArt-${section}-${album.id}`
}

function buildSharedTransition(sourceTag: string) {
  const tags = { [sourceTag]: { opacity: 1 } }
  return SharedTransition.custom(new PageTransition(), {
    pageStart: { opacity: 0, x: 0, y: 200, cornerRadius: 32, sharedTransitionTags: tags },
    pageReturn: { opacity: 0, x: 0, y: 200, cornerRadius: 32, sharedTransitionTags: tags },
    pageEnd: {
      cornerRadius: 50,
      opacity: 1,
      spring: { tension: 60, friction: 8, mass: 1 },
      sharedTransitionTags: tags,
    },
    interactive: { dismiss: { finishThreshold: 0.5, morph: true } },
  })
}

export function openAlbum(router: Router, album: Album, section: string) {
  player.playAlbum(album)
  const sourceTag = albumArtTag(section, album)
  router.navigate('Album', {
    params: { albumId: album.id, sourceTag },
    transition: buildSharedTransition(sourceTag),
  })
}
