import {
  bootstrapApplication,
  provideNativeScriptHttpClient,
  provideNativeScriptRouter,
  registerElement,
  runNativeScriptAngularApp,
} from '@nativescript/angular';
import { provideZonelessChangeDetection } from '@angular/core';
import { withInterceptorsFromDi } from '@angular/common/http';
import { ImageCacheIt } from '@triniwiz/nativescript-image-cache-it';
// Side-effect: registers `menu` / `contextMenu` Properties on View
import '@nstudio/nativescript-menu';
import { startSimDeckInspector } from '@nativescript/simdeck-inspector';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

registerElement('ImageCacheIt', () => ImageCacheIt);

if (__DEV__) {
  startSimDeckInspector({ port: 4310 });
}

runNativeScriptAngularApp({
  appModuleBootstrap: () => {
    return bootstrapApplication(AppComponent, {
      providers: [
        provideNativeScriptHttpClient(withInterceptorsFromDi()),
        provideNativeScriptRouter(routes),
        provideZonelessChangeDetection(),
      ],
    });
  },
});
