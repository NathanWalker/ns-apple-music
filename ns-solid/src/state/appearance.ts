import { createSignal, onCleanup } from 'solid-js'
import { Application } from '@nativescript/core'

const [appearance, setAppearance] = createSignal<'light' | 'dark'>(
  (Application.systemAppearance() as 'light' | 'dark') ?? 'light'
)

Application.on(Application.systemAppearanceChangedEvent, (args: any) => {
  setAppearance((args?.newValue as 'light' | 'dark') ?? 'light')
})

export const useAppearance = () => {
  const isDark = () => appearance() === 'dark'
  const fg = () => (isDark() ? '#ffffff' : '#000000')
  const muted = () => '#8e8e93'
  const surface = () => (isDark() ? '#1c1c1e' : '#f2f2f7')
  onCleanup(() => {})
  return { appearance, isDark, fg, muted, surface }
}

export { appearance }
