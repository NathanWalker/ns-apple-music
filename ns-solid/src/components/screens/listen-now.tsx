import { For } from 'solid-js'
import { useRouter } from 'solid-navigation'
import { topPicks, recentlyPlayed, madeForYou } from '../../data/music'
import { useAppearance } from '../../state/appearance'
import { albumArtTag, openAlbum } from '../../utils/album-navigation'

const HERO = 'listen-now-hero'
const TOP_PICKS = 'listen-now-top-picks'
const RECENTLY_PLAYED = 'listen-now-recently-played'
const MADE_FOR_YOU = 'listen-now-made-for-you'

export default function ListenNow() {
  const router = useRouter()
  const { fg, muted } = useAppearance()

  return (
    <page>
      <actionbar title="Listen Now" iosLargeTitle="true">
        <actionitem
          icon="sys://person.crop.circle.fill"
          ref={(el: any) => { if (el) el.ios.position = 'right' }}
        />
      </actionbar>
      <scrollview iosContentInsetAdjustmentBehavior="automatic">
        <stacklayout class="pb-32">
          {/* Hero card */}
          <gridlayout class="px-5 pt-3">
            <gridlayout rows="*" columns="*" borderRadius="14" class="overflow-hidden" on:tap={() => openAlbum(router, topPicks[0], HERO)}>
              <imagecacheit src={topPicks[0].artwork} stretch="aspectFill" height="380" borderRadius="14"
              sharedTransitionTag={albumArtTag(HERO, topPicks[0])} />
              <stacklayout verticalAlignment="bottom" class="p-4" sharedTransitionTag="albumInfo">
                <label text="FEATURED ALBUM" class="text-xs font-bold" color="#ffffff" opacity="0.85" />
                <label text={topPicks[0].title} class="text-3xl font-bold" color="#ffffff" />
                <label text={topPicks[0].artist} class="text-base" color="#ffffff" opacity="0.85" />
              </stacklayout>
            </gridlayout>
          </gridlayout>

          {/* Top Picks horizontal */}
          <stacklayout class="pt-7">
            <label text="Top Picks" class="text-2xl font-bold px-5" color={fg()} />
            <scrollview orientation="horizontal">
              <stacklayout orientation="horizontal" class="px-5 pt-3">
                <For each={topPicks.slice(1)}>
                  {(album) => (
                    <stacklayout class="mr-4" width="200" on:tap={() => openAlbum(router, album, TOP_PICKS)}>
                      <imagecacheit src={album.artwork} width="200" height="200" stretch="aspectFill" borderRadius="10" sharedTransitionTag={albumArtTag(TOP_PICKS, album)} />
                      <label text={album.title} class="text-base pt-2" color={fg()} maxLines="1" textWrap="false" />
                      <label text={album.artist} class="text-sm" color={muted()} maxLines="1" textWrap="false" />
                    </stacklayout>
                  )}
                </For>
              </stacklayout>
            </scrollview>
          </stacklayout>

          {/* Recently Played row list */}
          <stacklayout class="pt-7">
            <label text="Recently Played" class="text-2xl font-bold px-5" color={fg()} />
            <stacklayout class="px-5 pt-3">
              <For each={recentlyPlayed}>
                {(album) => (
                  <gridlayout columns="64, *, auto" rows="auto" class="py-2" on:tap={() => openAlbum(router, album, RECENTLY_PLAYED)}>
                    <imagecacheit col={0} src={album.artwork} width="56" height="56" stretch="aspectFill" borderRadius="6" sharedTransitionTag={albumArtTag(RECENTLY_PLAYED, album)} />
                    <stacklayout col={1} verticalAlignment="center" class="pl-3">
                      <label text={album.title} class="text-base" color={fg()} maxLines="1" textWrap="false" />
                      <label text={album.artist} class="text-sm" color={muted()} maxLines="1" textWrap="false" />
                    </stacklayout>
                    <image col={2} src="sys://chevron.right" width="14" height="14" tintColor="#8e8e93" verticalAlignment="center" />
                  </gridlayout>
                )}
              </For>
            </stacklayout>
          </stacklayout>

          {/* Made For You */}
          <stacklayout class="pt-7">
            <label text="Made For You" class="text-2xl font-bold px-5" color={fg()} />
            <scrollview orientation="horizontal">
              <stacklayout orientation="horizontal" class="px-5 pt-3">
                <For each={madeForYou}>
                  {(album) => (
                    <stacklayout class="mr-4" width="160" on:tap={() => openAlbum(router, album, MADE_FOR_YOU)}>
                      <imagecacheit src={album.artwork} width="160" height="160" stretch="aspectFill" borderRadius="10" sharedTransitionTag={albumArtTag(MADE_FOR_YOU, album)} />
                      <label text={album.title} class="text-sm pt-2" color={fg()} maxLines="1" textWrap="false" />
                      <label text={album.artist} class="text-xs" color={muted()} maxLines="1" textWrap="false" />
                    </stacklayout>
                  )}
                </For>
              </stacklayout>
            </scrollview>
          </stacklayout>
        </stacklayout>
      </scrollview>
    </page>
  )
}
