import { createApp, registerElement } from 'nativescript-vue';
import { ImageCacheIt } from '@triniwiz/nativescript-image-cache-it';
// Side-effect: registers `menu` / `contextMenu` Properties on View
import '@nstudio/nativescript-menu';
import { startSimDeckInspector } from '@nativescript/simdeck-inspector';

import Home from './components/Home.vue';

registerElement('ImageCacheIt', () => ImageCacheIt);

if (__DEV__) {
  startSimDeckInspector({ port: 4310 });
}

createApp(Home).start();
