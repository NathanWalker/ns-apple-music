import { player } from '../state/player'
import { useAppearance } from '../state/appearance'
import { openNowPlaying } from './screens/now-playing'

export default function NowPlayingBar() {
  const { fg, muted } = useAppearance()

  return (
    <gridlayout
      columns="48, *, 36, 36"
      rows="48"
      padding="0 12"
      verticalAlignment="center"
      on:tap={openNowPlaying}
    >
      <imagecacheit
        col={0}
        src={player.currentAlbum().artwork}
        width="32"
        height="32"
        stretch="aspectFill"
        borderRadius="5"
        verticalAlignment="center"
        sharedTransitionTag="albumArt"
      />
      <stacklayout col={1} verticalAlignment="center" padding="0 0 0 4">
        <label
          text={player.currentTrack().title}
          color={fg()}
          fontSize="15"
          fontWeight="600"
          maxLines="1"
          textWrap="false"
        />
        <label
          text={player.currentAlbum().artist}
          color={muted()}
          fontSize="13"
          maxLines="1"
          textWrap="false"
        />
      </stacklayout>
      <image
        col={2}
        src={player.isPlaying() ? 'sys://pause.fill' : 'sys://play.fill'}
        width="20"
        height="20"
        stretch="aspectFit"
        tintColor={fg()}
        verticalAlignment="center"
        horizontalAlignment="center"
        on:tap={() => player.togglePlay()}
      />
      <image
        col={3}
        src="sys://forward.fill"
        width="20"
        height="20"
        stretch="aspectFit"
        tintColor={fg()}
        verticalAlignment="center"
        horizontalAlignment="center"
        on:tap={() => player.skipForward()}
      />
    </gridlayout>
  )
}
