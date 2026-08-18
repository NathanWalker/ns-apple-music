import { defineConfig, mergeConfig, type Plugin } from 'vite';
import { angularConfig } from '@nativescript/vite/angular';

function angularTemplateSourceLocationsPlugin(): Plugin {
  const enable = async () => {
    const angularCompiler = await import('@angular/compiler');
    (angularCompiler as { setEnableTemplateSourceLocations?: (flag: boolean) => void })
      .setEnableTemplateSourceLocations?.(true);
  };
  return {
    name: 'angular-template-source-locations',
    enforce: 'pre',
    configResolved: enable,
    buildStart: enable,
  };
}

export default defineConfig(({ mode }) =>
  mergeConfig(angularConfig({ mode }), {
    plugins: [angularTemplateSourceLocationsPlugin()],
  })
);
