import { signal, computed } from '@angular/core';
import { Application } from '@nativescript/core';

const appearance = signal<'light' | 'dark'>(
  (Application.systemAppearance() as 'light' | 'dark') ?? 'light'
);

Application.on(Application.systemAppearanceChangedEvent, (args: any) => {
  appearance.set((args?.newValue as 'light' | 'dark') ?? 'light');
});

export const isDark = computed(() => appearance() === 'dark');
export const fg = computed(() => (isDark() ? '#ffffff' : '#000000'));
export const muted = computed(() => '#8e8e93');
export const surface = computed(() => (isDark() ? '#1c1c1e' : '#f2f2f7'));

export { appearance };
