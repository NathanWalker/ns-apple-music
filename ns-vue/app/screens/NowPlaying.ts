import { $showModal } from 'nativescript-vue';
import { ModalTransition, SharedTransition } from '@nativescript/core';
import NowPlaying from './NowPlaying.vue';

export function openNowPlaying() {
  $showModal(NowPlaying, {
    fullscreen: true,
    transition: SharedTransition.custom(new ModalTransition(), {
      pageStart: { cornerRadius: 26 },
      pageEnd: {
        cornerRadius: 50,
        spring: { tension: 65, friction: 11, mass: 1 },
      },
      pageReturn: { cornerRadius: 26 },
      interactive: { dismiss: { finishThreshold: 0.5 } },
    }) as any,
  } as any);
}
