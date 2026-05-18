import { ref, computed } from 'nativescript-vue';
import { Application } from '@nativescript/core';

const appearance = ref<'light' | 'dark'>(
  (Application.systemAppearance() as 'light' | 'dark') ?? 'light'
);

Application.on(Application.systemAppearanceChangedEvent, (args: any) => {
  appearance.value = (args?.newValue as 'light' | 'dark') ?? 'light';
});

export const isDark = computed(() => appearance.value === 'dark');
export const fg = computed(() => (isDark.value ? '#ffffff' : '#000000'));
export const muted = computed(() => '#8e8e93');
export const surface = computed(() => (isDark.value ? '#1c1c1e' : '#f2f2f7'));

export { appearance };
