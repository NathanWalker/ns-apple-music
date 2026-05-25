import { PageTransition, SharedTransition } from '@nativescript/core';
import { RouterExtensions } from '@nativescript/angular';
import type { Album } from './music';
import { player } from './player';

export function albumArtTag(section: string, album: Album): string {
  return `albumArt-${section}-${album.id}`;
}

function buildSharedTransition(sourceTag: string) {
  const tags = { [sourceTag]: { opacity: 1 } };
  return SharedTransition.custom(new PageTransition(), {
    pageStart: { opacity: 0, x: 0, y: 200, cornerRadius: 32, sharedTransitionTags: tags },
    pageReturn: { opacity: 0, x: 0, y: 200, cornerRadius: 32, sharedTransitionTags: tags },
    pageEnd: {
      cornerRadius: 50,
      opacity: 1,
      spring: { tension: 60, friction: 8, mass: 1 },
      sharedTransitionTags: tags,
    },
    interactive: {
      dismiss: {
        finishThreshold: 0.5,
        morph: true,
        shadow: { opacity: 0.45, radius: 32, offset: { x: 0, y: 12 } },
      },
    },
  });
}

// Named outlets cleared during album navigation. The TabView declares its
// tabs as named outlets (listenNowTab, browseTab, …) which Angular Router
// keeps in the URL alongside the primary outlet. A plain ['/album', id]
// navigation tries to set the primary outlet AND keep the named outlets,
// which Angular rejects as "Two segments cannot have the same outlet name"
// (NG04006). Listing them as null in the same command lets the primary
// outlet receive the album route.
const TAB_OUTLET_RESET = {
  listenNowTab: null,
  browseTab: null,
  radioTab: null,
  libraryTab: null,
  searchTab: null,
} as const;

export function openAlbum(routerExtensions: RouterExtensions, album: Album, section: string) {
  player.playAlbum(album);
  const sourceTag = albumArtTag(section, album);
  routerExtensions.navigate(
    [
      '/',
      { outlets: { primary: ['album', album.id], ...TAB_OUTLET_RESET } },
    ],
    {
      queryParams: { sourceTag },
      transition: buildSharedTransition(sourceTag) as any,
    } as any,
  );
}
