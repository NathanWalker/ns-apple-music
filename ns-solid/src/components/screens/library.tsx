import { For, Show } from 'solid-js'
import { useRouter } from 'solid-navigation'
import { librarySections, playlists, recentlyPlayed } from '../../data/music'
import { useAppearance } from '../../state/appearance'
import { chunks } from '../../utils/chunks'
import { albumArtTag, openAlbum } from '../../utils/album-navigation'

const RECENT = 'library-recently-added'

export default function Library() {
  const router = useRouter()
  const { fg, muted } = useAppearance()

  const recent = recentlyPlayed.slice(0, 4)

  return (
    <page>
      <actionbar title="Library" iosLargeTitle="true">
        <actionitem
          icon="sys://person.crop.circle.fill"
          ref={(el: any) => { if (el) el.ios.position = 'right' }}
        />
      </actionbar>
      <scrollview iosContentInsetAdjustmentBehavior="automatic">
        <stacklayout class="pb-32">
          <stacklayout iosIgnoreSafeArea="true" class="pt-4">
            {librarySections.map((section) => (
              <gridlayout columns="32, *, auto" rows="auto" class="px-5" height="50">
                <image col={0} src={section.icon} width="22" height="22" tintColor="#ff375f" verticalAlignment="center" horizontalAlignment="left" />
                <label col={1} text={section.label} class="text-lg pl-3" color={fg()} verticalAlignment="center" />
                <image col={2} src="sys://chevron.right" width="14" height="14" tintColor="#8e8e93" verticalAlignment="center" />
              </gridlayout>
            ))}
          </stacklayout>

          <label text="Recently Added" class="text-2xl font-bold px-5 pt-7 pb-2" color={fg()} />
          <For each={chunks(recent, 2)}>
            {(pair) => (
              <gridlayout columns="*, *" rows="auto" class="px-5 pb-3">
                <stacklayout col={0} class="pr-2" on:tap={() => openAlbum(router, pair[0], RECENT)}>
                  <imagecacheit src={pair[0].artwork} stretch="aspectFill" height="170" borderRadius="10" sharedTransitionTag={albumArtTag(RECENT, pair[0])} />
                  <label text={pair[0].title} class="text-base pt-2" color={fg()} maxLines="1" textWrap="false" />
                  <label text={pair[0].artist} class="text-sm" color={muted()} maxLines="1" textWrap="false" />
                </stacklayout>
                <Show when={pair[1]}>
                  <stacklayout col={1} class="pl-2" on:tap={() => openAlbum(router, pair[1], RECENT)}>
                    <imagecacheit src={pair[1].artwork} stretch="aspectFill" height="170" borderRadius="10" sharedTransitionTag={albumArtTag(RECENT, pair[1])} />
                    <label text={pair[1].title} class="text-base pt-2" color={fg()} maxLines="1" textWrap="false" />
                    <label text={pair[1].artist} class="text-sm" color={muted()} maxLines="1" textWrap="false" />
                  </stacklayout>
                </Show>
              </gridlayout>
            )}
          </For>

          <label text="Playlists" class="text-2xl font-bold px-5 pt-7 pb-1" color={fg()} />
          <stacklayout class="px-5">
            <For each={playlists}>
              {(pl) => (
                <gridlayout columns="64, *, auto" rows="auto" class="py-2">
                  <imagecacheit col={0} src={pl.artwork} width="56" height="56" stretch="aspectFill" borderRadius="6" />
                  <stacklayout col={1} verticalAlignment="center" class="pl-3">
                    <label text={pl.title} class="text-base" color={fg()} maxLines="1" textWrap="false" />
                    <label text={pl.curator} class="text-sm" color={muted()} maxLines="1" textWrap="false" />
                  </stacklayout>
                  <image col={2} src="sys://chevron.right" width="14" height="14" tintColor="#8e8e93" verticalAlignment="center" />
                </gridlayout>
              )}
            </For>
          </stacklayout>
        </stacklayout>
      </scrollview>
    </page>
  )
}
