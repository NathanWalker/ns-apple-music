import { For, Show } from 'solid-js'
import { useRouter } from 'solid-navigation'
import { newReleases } from '../../data/music'
import { useAppearance } from '../../state/appearance'
import { chunks } from '../../utils/chunks'
import { albumArtTag, openAlbum } from '../../utils/album-navigation'

const HERO = 'browse-hero'
const HOT_TRACKS = 'browse-hot-tracks'

export default function Browse() {
  const router = useRouter()
  const { fg, muted } = useAppearance()

  const hero = newReleases[0]
  const grid = newReleases.slice(1)

  return (
    <page>
      <actionbar title="New" iosLargeTitle="true">
        <actionitem
          icon="sys://person.crop.circle.fill"
          ref={(el: any) => { if (el) el.ios.position = 'right' }}
        />
      </actionbar>
      <scrollview iosContentInsetAdjustmentBehavior="automatic">
        <stacklayout class="pb-32">
          <stacklayout class="px-5 pt-3">
            <gridlayout rows="*" columns="*" borderRadius="14" class="overflow-hidden" on:tap={() => openAlbum(router, hero, HERO)}>
              <imagecacheit src={hero.artwork} stretch="aspectFill" height="320" borderRadius="14" sharedTransitionTag={albumArtTag(HERO, hero)} />
              <stacklayout verticalAlignment="bottom" class="p-4">
                <label text="NEW RELEASE" class="text-xs font-bold" color="#ffffff" opacity="0.85" />
                <label text={hero.title} class="text-3xl font-bold" color="#ffffff" />
                <label text={hero.artist} class="text-base" color="#ffffff" opacity="0.85" />
              </stacklayout>
            </gridlayout>
          </stacklayout>

          <label text="Hot Tracks" class="text-2xl font-bold px-5 pt-7 pb-2" color={fg()} />
          <For each={chunks(grid, 2)}>
            {(pair) => (
              <gridlayout columns="*, *" rows="auto" class="px-5 pb-3">
                <stacklayout col={0} class="pr-2" on:tap={() => openAlbum(router, pair[0], HOT_TRACKS)}>
                  <imagecacheit src={pair[0].artwork} stretch="aspectFill" height="170" borderRadius="10" sharedTransitionTag={albumArtTag(HOT_TRACKS, pair[0])} />
                  <label text={pair[0].title} class="text-base pt-2" color={fg()} maxLines="1" textWrap="false" />
                  <label text={pair[0].artist} class="text-sm" color={muted()} maxLines="1" textWrap="false" />
                </stacklayout>
                <Show when={pair[1]}>
                  <stacklayout col={1} class="pl-2" on:tap={() => openAlbum(router, pair[1], HOT_TRACKS)}>
                    <imagecacheit src={pair[1].artwork} stretch="aspectFill" height="170" borderRadius="10" sharedTransitionTag={albumArtTag(HOT_TRACKS, pair[1])} />
                    <label text={pair[1].title} class="text-base pt-2" color={fg()} maxLines="1" textWrap="false" />
                    <label text={pair[1].artist} class="text-sm" color={muted()} maxLines="1" textWrap="false" />
                  </stacklayout>
                </Show>
              </gridlayout>
            )}
          </For>
        </stacklayout>
      </scrollview>
    </page>
  )
}
