/**
 * Solid 2 async search
 */
import { createMemo, createSignal, isPending, For, Loading, Show } from 'solid-js'
import { albums, type Album } from '../data/music'
import { player } from '../state/player'

export default function AsyncSearch() {
  const [query, setQuery] = createSignal('')

  // Async is just a computation that returns a promise. 
  // No createResource, no loading flag, no transition wrapper.
  const results = createMemo<Album[]>(() => searchCatalog(query().trim()))

  return (
    <listview
      showSearch="true"
      searchAutoHide="false"
      on:searchChange={(args: any) => setQuery(args.data?.text ?? '')}
    >
      <Loading fallback={<label text="Searching…" class="p-5 text-center" />}>
        <Show when={isPending(() => results())}>
          <label text="Updating…" class="p-3 text-center" />
        </Show>
        <For each={results()}>
          {(album) => (
            <label
              text={album.title}
              class="p-3"
              on:tap={() => player.playAlbum(album)}
            />
          )}
        </For>
      </Loading>
    </listview>
  )
}


/** Stands in for a catalog endpoint so there is real latency to render around. */
const searchCatalog = async (query: string): Promise<Album[]> => {
  await new Promise((resolve) => setTimeout(resolve, 700))
  const q = query.toLowerCase()
  return albums.filter(
    (a) => a.title.toLowerCase().includes(q) || a.artist.toLowerCase().includes(q),
  )
}