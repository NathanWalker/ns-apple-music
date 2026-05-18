import { render } from "@nativescript-community/solid-js";
import { Application } from "@nativescript/core";
import { document, registerElement } from "dominative";
import { ImageCacheIt } from "@triniwiz/nativescript-image-cache-it";
// Side-effect: registers `menu` / `contextMenu` Properties on View
import "@nstudio/nativescript-menu";
import { startSimDeckInspector } from "@nativescript/simdeck-inspector";
import { App } from "./app";

registerElement("imagecacheit", ImageCacheIt);

if (__DEV__) {
  startSimDeckInspector({ port: 4310 });
}

Application.run({
  create: () => {
    render(App, document.body);
    return document;
  },
})
