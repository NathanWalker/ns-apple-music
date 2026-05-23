import { Device, PageTransition, SharedTransition } from '@nativescript/core';
import { $navigateTo } from 'nativescript-vue';
import type { Album } from './music';
import { player } from './player';
import AlbumDetail from './screens/AlbumDetail.vue';

export function albumArtTag(section: string, album: Album): string {
  return `albumArt-${section}-${album.id}`;
}

function buildSharedTransition(sourceTag: string) {
  const tags = { [sourceTag]: { opacity: 1 } };
  return SharedTransition.custom(new PageTransition(), {
    pageStart: { opacity: 0, x: 0, y: 200, cornerRadius: Device.deviceType === 'Phone' ? 32 : 12, sharedTransitionTags: tags },
    pageReturn: { opacity: 0, x: 0, y: 200, cornerRadius: Device.deviceType === 'Phone' ? 32 : 12, sharedTransitionTags: tags },
    pageEnd: {
      cornerRadius: Device.deviceType === 'Phone' ? 50 : 32,
      opacity: 1,
      spring: { tension: 60, friction: 8, mass: 1 },
      sharedTransitionTags: tags,
    },
    interactive: { dismiss: { finishThreshold: 0.5, morph: true } },
  });
}

export function openAlbum(album: Album, section: string) {
  player.playAlbum(album);
  const sourceTag = albumArtTag(section, album);
  $navigateTo(AlbumDetail, {
    props: { albumId: album.id, sourceTag } as any,
    transition: buildSharedTransition(sourceTag) as any,
  });
}
