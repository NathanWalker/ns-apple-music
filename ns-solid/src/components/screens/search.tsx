import { createMemo, createSignal, isPending, For, Loading, Show } from 'solid-js'
import { useRouter } from 'solid-navigation'
import {
  searchCatalog,
  searchCategories,
  type Album,
  type Track,
} from '../../data/music'
import { useAppearance } from '../../state/appearance'
import { player } from '../../state/player'
import { chunks } from '../../utils/chunks'
import { albumArtTag, openAlbum } from '../../utils/album-navigation'
import { openNowPlaying } from './now-playing'

const SEARCH_SECTION = 'search-results'

const CATEGORY_ROW_HEIGHT = 104
const HEADER_HEIGHT = 44
const ALBUM_ROW_HEIGHT = 72
const TRACK_ROW_HEIGHT = 72
const EMPTY_ROW_HEIGHT = 120

type Category = (typeof searchCategories)[number]
type CategoryRow = { kind: 'categoryRow'; pair: [Category, Category | undefined] }
type SectionHeader = { kind: 'header'; label: string }
type AlbumResult = { kind: 'album'; album: Album }
type TrackResult = {
  kind: 'track'
  album: Album
  track: Track
  trackIndex: number
}
type EmptyResult = { kind: 'empty'; query: string }
type SearchItem =
  | CategoryRow
  | SectionHeader
  | AlbumResult
  | TrackResult
  | EmptyResult

export default function Search() {
  const router = useRouter()
  const { fg, muted } = useAppearance()
  const [query, setQuery] = createSignal('')

  const browseItems = (): SearchItem[] =>
    chunks(searchCategories, 2).map(
      (pair) =>
        ({
          kind: 'categoryRow',
          pair: [pair[0], pair[1]] as [Category, Category | undefined],
        }) as SearchItem,
    )

  // Returning a promise is all it takes to make this async — no createResource,
  // no loading flag, no transition. The empty-query branch returns an array and
  // reads immediately; the search branch suspends the read until it resolves.
  const items = createMemo<SearchItem[]>(() => {
    const q = query().trim()
    if (!q) return browseItems()

    return searchCatalog(q).then(({ albums, tracks }): SearchItem[] => {
      const result: SearchItem[] = []
      if (albums.length) {
        result.push({ kind: 'header', label: 'Albums' })
        for (const album of albums) result.push({ kind: 'album', album })
      }
      if (tracks.length) {
        result.push({ kind: 'header', label: 'Songs' })
        for (const t of tracks) result.push({ kind: 'track', ...t })
      }
      if (!result.length) result.push({ kind: 'empty', query: q })
      return result
    })
  })

  const statusRow = (text: string, height: number) => (
    <gridlayout height={height} verticalAlignment="center">
      <label
        text={text}
        class="text-base"
        color={muted()}
        horizontalAlignment="center"
        verticalAlignment="center"
      />
    </gridlayout>
  )

  const playTrack = (album: Album, trackIndex: number) => {
    player.playAlbum(album, trackIndex)
    openNowPlaying()
  }

  const renderItem = (item: SearchItem) => {
    if (item.kind === 'categoryRow') {
      return (
        <gridlayout
          columns="*, *"
          rows="*"
          height={CATEGORY_ROW_HEIGHT}
          class="px-5 pb-3"
        >
          <gridlayout
            col={0}
            height="92"
            borderRadius="10"
            backgroundColor={item.pair[0].color}
            class="mr-2"
            verticalAlignment="top"
          >
            <label
              text={item.pair[0].label}
              class="text-lg font-bold p-3 text-white"
              verticalAlignment="top"
            />
          </gridlayout>
          <Show when={item.pair[1]}>
            <gridlayout
              col={1}
              height="92"
              borderRadius="10"
              backgroundColor={item.pair[1]!.color}
              class="ml-2"
              verticalAlignment="top"
            >
              <label
                text={item.pair[1]!.label}
                class="text-lg font-bold p-3 text-white"
                verticalAlignment="top"
              />
            </gridlayout>
          </Show>
        </gridlayout>
      )
    }
    if (item.kind === 'header') {
      return (
        <gridlayout height={HEADER_HEIGHT} verticalAlignment="bottom">
          <label
            text={item.label}
            class="text-xl font-bold px-5 pb-1"
            color={fg()}
            verticalAlignment="bottom"
          />
        </gridlayout>
      )
    }
    if (item.kind === 'album') {
      const album = item.album
      return (
        <gridlayout
          columns="64, *, auto"
          rows="*"
          height={ALBUM_ROW_HEIGHT}
          class="px-5"
          on:tap={() => openAlbum(router, album, SEARCH_SECTION)}
        >
          <imagecacheit
            col={0}
            src={album.artwork}
            width="56"
            height="56"
            stretch="aspectFill"
            borderRadius="6"
            verticalAlignment="center"
            sharedTransitionTag={albumArtTag(SEARCH_SECTION, album)}
          />
          <stacklayout col={1} verticalAlignment="center" class="pl-3">
            <label
              text={album.title}
              class="text-base"
              color={fg()}
              maxLines="1"
              textWrap="false"
            />
            <label
              text={'Album · ' + album.artist}
              class="text-sm"
              color={muted()}
              maxLines="1"
              textWrap="false"
            />
          </stacklayout>
          <image
            col={2}
            src="sys://chevron.right"
            width="14"
            height="14"
            tintColor="#8e8e93"
            verticalAlignment="center"
          />
        </gridlayout>
      )
    }
    if (item.kind === 'track') {
      const { album, track, trackIndex } = item
      return (
        <gridlayout
          columns="64, *, auto"
          rows="*"
          height={TRACK_ROW_HEIGHT}
          class="px-5"
          on:tap={() => playTrack(album, trackIndex)}
        >
          <imagecacheit
            col={0}
            src={album.artwork}
            width="56"
            height="56"
            stretch="aspectFill"
            borderRadius="6"
            verticalAlignment="center"
          />
          <stacklayout col={1} verticalAlignment="center" class="pl-3">
            <label
              text={track.title}
              class="text-base"
              color={fg()}
              maxLines="1"
              textWrap="false"
            />
            <label
              text={'Song · ' + album.artist}
              class="text-sm"
              color={muted()}
              maxLines="1"
              textWrap="false"
            />
          </stacklayout>
          <label
            col={2}
            text={track.duration}
            class="text-sm"
            color={muted()}
            verticalAlignment="center"
          />
        </gridlayout>
      )
    }
    // empty
    return (
      <gridlayout height={EMPTY_ROW_HEIGHT} verticalAlignment="center">
        <label
          text={'No results for "' + item.query + '"'}
          class="text-base"
          color={muted()}
          horizontalAlignment="center"
          verticalAlignment="center"
        />
      </gridlayout>
    )
  }

  return (
    <page>
      <actionbar title="Search" iosLargeTitle="true" />
      <listview
        showSearch="true"
        searchAutoHide="false"
        separatorColor="transparent"
        iosEstimatedRowHeight={ALBUM_ROW_HEIGHT}
        on:searchChange={(args: any) => {
          setQuery(args?.data?.text ?? args?.text ?? '')
        }}
      >
        <Loading fallback={statusRow('Searching…', EMPTY_ROW_HEIGHT)}>
          {/* Stays true while a *new* query is in flight, with the previous
              results still on screen — the boundary only falls back when there
              is nothing rendered yet. */}
          <Show when={isPending(() => items())}>
            {statusRow('Updating…', HEADER_HEIGHT)}
          </Show>
          <For each={items()}>{(item) => renderItem(item)}</For>
        </Loading>
      </listview>
    </page>
  )
}
