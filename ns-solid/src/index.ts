import { render } from "@nativescript-community/solid-js";
import { Application, Frame } from "@nativescript/core";
import { document, registerElement } from "dominative";
import { ImageCacheIt } from "@triniwiz/nativescript-image-cache-it";
// Side-effect: registers `menu` / `contextMenu` Properties on View
import "@nstudio/nativescript-menu";
import { startSimDeckInspector } from "@nativescript/simdeck-inspector";
import { startSolidApp } from "@nativescript/vite/solid-bootstrap";
import { App } from "./app";

registerElement("imagecacheit", ImageCacheIt);

if (__DEV__) {
  startSimDeckInspector({ port: 4310 });
  // Keep the "HMR update applied" toast below the content instead of over the
  // nav title — matters for the demo/ recordings.
  (globalThis as any).__NS_HMR_OVERLAY_POSITION__ = "bottom";
}

// startSolidApp boots the app (Application.run + render) and wires HMR
// remounting: on shell/component edits the app tree is re-rendered from a
// freshly imported `/src/app`. `Frame` enables in-place root replacement for
// the solid-navigation topmost-frame router.
startSolidApp({
  Application,
  render,
  document,
  Frame,
  root: App,
  rootModule: "/src/app",
});
