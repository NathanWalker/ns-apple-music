import { $showModal } from 'nativescript-vue';
import { Device, ModalTransition, SharedTransition } from '@nativescript/core';
import NowPlaying from './NowPlaying.vue';

export function openNowPlaying() {
  $showModal(NowPlaying, {
    fullscreen: true,
    transition: SharedTransition.custom(new ModalTransition(), {
      pageStart: { cornerRadius: Device.deviceType === 'Phone' ? 26 : 12 },
      pageEnd: {
        cornerRadius: Device.deviceType === 'Phone' ? 50 : 32,
        spring: { tension: 65, friction: 11, mass: 1 },
      },
      pageReturn: { cornerRadius: Device.deviceType === 'Phone' ? 26 : 12 },
      interactive: {
        dismiss: {
          finishThreshold: 0.5,
          shadow: { opacity: 0.35, radius: 28, offset: { x: 0, y: 10 } },
        },
      },
    }) as any,
  } as any);
}
