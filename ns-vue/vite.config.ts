import { defineConfig, mergeConfig } from 'vite';
import { vueConfig } from '@nativescript/vite/vue';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const expandLogical = require('./postcss-expand-logical.cjs');

export default defineConfig(({ mode }) =>
  mergeConfig(vueConfig({ mode }), {
    css: {
      postcss: {
        plugins: [expandLogical()],
      },
    },
  })
);
