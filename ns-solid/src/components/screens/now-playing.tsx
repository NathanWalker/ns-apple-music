import { render } from "@nativescript-community/solid-js";
import {
  Color,
  Frame,
  ModalTransition,
  type Page,
  Screen,
  SharedTransition,
  type ShowModalOptions,
} from "@nativescript/core";
import type { MenuAction } from "@nstudio/nativescript-menu";
import { document } from "dominative";
import { player } from "../../state/player";

function darken(hex: string, amount = 0.35): string {
  const c = new Color(hex);
  const r = Math.max(0, Math.floor(c.r * (1 - amount)));
  const g = Math.max(0, Math.floor(c.g * (1 - amount)));
  const b = Math.max(0, Math.floor(c.b * (1 - amount)));
  return new Color(255, r, g, b).hex;
}

function NowPlaying(props: { close: () => void }) {
  const ellipsisMenu: MenuAction[] = [
    {
      name: "",
      childrenStyle: "palette",
      children: [
        { id: 1, name: "Love", icon: "heart" },
        { id: 2, name: "Suggest Less", icon: "hand.thumbsdown" },
        { id: 3, name: "Share Song", icon: "square.and.arrow.up" },
      ],
    },
    { id: 4, name: "Add to Library", icon: "plus" },
    { id: 5, name: "Add to a Playlist", icon: "text.badge.plus" },
    { id: 6, name: "Create Station", icon: "badge.plus.radiowaves.right" },
    {
      id: 7,
      name: "Go to Album",
      subtitle: player.currentAlbum().title,
      icon: "square.stack",
    },
    {
      id: 8,
      name: "Go to Artist",
      subtitle: player.currentAlbum().artist,
      icon: "music.mic",
    },
    { id: 9, name: "View Full Lyrics", icon: "quote.bubble" },
    { id: 10, name: "Share Lyrics", icon: "text.bubble" },
    { id: 11, name: "Sleep Timer", icon: "moon.zzz" },
    {
      id: 12,
      name: "Report a Concern",
      icon: "exclamationmark.bubble",
      destructive: true,
    },
  ];

  return (
    <gridlayout rows="*">
      {/* Vibrant gradient backdrop based on the album accent */}
      <gridlayout
        backgroundColor={player.currentAlbum().accent}
        backgroundImage={`linear-gradient(180deg, ${player.currentAlbum().accent} 0%, ${darken(player.currentAlbum().accent, 0.65)} 100%)`}
      />

      <scrollview>
        <stacklayout class="px-6 pb-10">
          {/* Drag handle / close */}
          <gridlayout
            class="pt-3 pb-3"
            horizontalAlignment="center"
            on:tap={props.close}
          >
            <gridlayout
              width="40"
              height="5"
              borderRadius="3"
              backgroundColor="#ffffff"
              opacity="0.4"
            />
          </gridlayout>

          {/* Artwork */}
          <gridlayout horizontalAlignment="center" class="pt-6">
            <imagecacheit
              src={player.currentAlbum().artwork}
              width="320"
              height="320"
              stretch="aspectFill"
              borderRadius="14"
              sharedTransitionTag="albumArt"
            />
          </gridlayout>

          {/* Title block */}
          <gridlayout columns="*, auto" rows="auto" class="pt-7">
            <stacklayout col={0}>
              <label
                text={player.currentTrack().title}
                class="on-image text-2xl font-bold text-white"
                maxLines="1"
                textWrap="false"
              />
              <label
                text={player.currentAlbum().artist}
                class="on-image text-lg text-white"
                opacity="0.75"
                maxLines="1"
                textWrap="false"
              />
            </stacklayout>
            <image
              col={1}
              src="sys://ellipsis.circle.fill"
              width="32"
              height="32"
              tintColor="#ffffff"
              opacity="0.7"
              verticalAlignment="center"
              menu={ellipsisMenu}
              on:selected={(args: any) =>
                console.log("menu selected:", args?.data?.option?.name)
              }
            />
          </gridlayout>

          {/* Progress */}
          <gridlayout rows="auto, auto" class="pt-5">
            <gridlayout
              row={0}
              height="4"
              borderRadius="2"
              opacity="0.25"
              class="bg-white"
            >
              <gridlayout
                horizontalAlignment="left"
                width={Math.round(player.progress() * 100) + "%"}
                class="bg-white"
                height="4"
                borderRadius="2"
              />
            </gridlayout>
            <gridlayout row={1} columns="*, auto" class="pt-2">
              <label
                col={0}
                text="1:23"
                class="on-image text-xs text-white"
                opacity="0.6"
              />
              <label
                col={1}
                text="-2:45"
                class="on-image text-xs text-white"
                opacity="0.6"
              />
            </gridlayout>
          </gridlayout>

          {/* Playback controls */}
          <gridlayout
            columns="*, *, *"
            rows="auto"
            class="pt-7"
            horizontalAlignment="center"
          >
            <image
              col={0}
              src="sys://backward.fill"
              width="36"
              height="36"
              tintColor="#ffffff"
              stretch="aspectFit"
              on:tap={() => player.skipBackward()}
            />
            <image
              col={1}
              src={player.isPlaying() ? "sys://pause.fill" : "sys://play.fill"}
              width="56"
              height="56"
              tintColor="#ffffff"
              stretch="aspectFit"
              class="px-10"
              on:tap={() => player.togglePlay()}
            />
            <image
              col={2}
              src="sys://forward.fill"
              width="36"
              height="36"
              tintColor="#ffffff"
              stretch="aspectFit"
              on:tap={() => player.skipForward()}
            />
          </gridlayout>

          {/* Volume */}
          <gridlayout columns="auto, *, auto" rows="auto" class="pt-8">
            <image
              col={0}
              src="sys://speaker.fill"
              width="16"
              height="16"
              tintColor="#ffffff"
              opacity="0.6"
              verticalAlignment="center"
            />
            <gridlayout
              col={1}
              height="4"
              borderRadius="2"
              backgroundColor="#ffffff"
              opacity="0.25"
              class="mx-3"
              verticalAlignment="center"
            >
              <gridlayout
                horizontalAlignment="left"
                width="55%"
                height="4"
                borderRadius="2"
                backgroundColor="#ffffff"
              />
            </gridlayout>
            <image
              col={2}
              src="sys://speaker.wave.3.fill"
              width="20"
              height="20"
              tintColor="#ffffff"
              opacity="0.6"
              verticalAlignment="center"
            />
          </gridlayout>
        </stacklayout>
      </scrollview>
    </gridlayout>
  );
}

export function openNowPlaying() {
  const launcher = Frame.topmost()?.currentPage;
  if (!launcher) return;

  const modalPage = document.createElement("Page") as unknown as Page;
  modalPage.actionBarHidden = true;
  // Match the gradient's top color so spring overshoot can't reveal a white page edge.
  modalPage.backgroundColor = new Color(player.currentAlbum().accent);
  const dispose = render(
    () => <NowPlaying close={() => modalPage.closeModal()} />,
    modalPage as any,
  );

  const options: ShowModalOptions = {
    context: {},
    fullscreen: true,
    transition: SharedTransition.custom(new ModalTransition(), {
      pageStart: {
        cornerRadius: 26,
      },
      pageEnd: {
        cornerRadius: 50,
        spring: { tension: 65, friction: 11, mass: 1 },
      },
      pageReturn: {
        cornerRadius: 26,
      },
      interactive: {
        dismiss: {
          finishThreshold: 0.5,
        },
      },
    }) as any,
    closeCallback: () => {
      dispose?.();
    },
  };

  launcher.showModal(modalPage, options);
}
