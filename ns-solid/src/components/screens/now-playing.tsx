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
import { createSignal } from "solid-js";
import { player } from "../../state/player";

function darken(hex: string, amount = 0.35): string {
  const c = new Color(hex);
  const r = Math.max(0, Math.floor(c.r * (1 - amount)));
  const g = Math.max(0, Math.floor(c.g * (1 - amount)));
  const b = Math.max(0, Math.floor(c.b * (1 - amount)));
  return new Color(255, r, g, b).hex;
}

function durationSeconds(duration: string): number {
  const [m, s] = duration.split(":").map(Number);
  return (m || 0) * 60 + (s || 0);
}

function formatTime(totalSeconds: number): string {
  const t = Math.max(0, Math.round(totalSeconds));
  const m = Math.floor(t / 60);
  const s = t % 60;
  return m + ":" + (s < 10 ? "0" : "") + s;
}

// The whole surface is styled through the `np-*` classes in src/now-playing.css
// so a stylesheet edit restyles the sheet while it stays presented. Only data
// bindings (gradient, progress width, times) and `tintColor` — which does not
// re-apply on a restyle — live inline.
function NowPlaying(props: { close: () => void }) {
  const [isStarred, setIsStarred] = createSignal(false);

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
      {/* Backdrop: a CSS-owned base with the album's accent gradient over it */}
      <gridlayout class="np-backdrop">
        <gridlayout
          class="np-gradient"
          backgroundImage={`linear-gradient(180deg, ${player.currentAlbum().accent} 0%, ${darken(player.currentAlbum().accent, 0.65)} 100%)`}
        />
      </gridlayout>

      <scrollview>
        <stacklayout class="np-body">
          {/* Drag handle / close */}
          <gridlayout class="np-handle-row" on:tap={props.close}>
            <gridlayout class="np-handle" />
          </gridlayout>

          {/* Artwork */}
          <gridlayout class="np-art-wrap">
            <imagecacheit
              class="np-art"
              src={player.currentAlbum().artwork}
              stretch="aspectFill"
              sharedTransitionTag="albumArt"
            />
          </gridlayout>

          {/* Title row */}
          <gridlayout class="np-meta" columns="*, auto, auto" rows="auto">
            <stacklayout col={0} class="np-titles" verticalAlignment="center">
              <label
                class="np-title"
                text={player.currentTrack().title}
                maxLines="1"
                textWrap="false"
              />
              <label
                class="np-artist"
                text={player.currentAlbum().artist}
                maxLines="1"
                textWrap="false"
              />
            </stacklayout>
            <gridlayout
              class="np-pill"
              col={1}
              on:tap={() => setIsStarred((s) => !s)}
            >
              <image
                class="np-pill-icon"
                src={isStarred() ? "sys://star.fill" : "sys://star"}
                stretch="aspectFit"
                tintColor="#ffffff"
              />
            </gridlayout>
            <gridlayout
              class="np-pill"
              col={2}
              menu={ellipsisMenu}
              on:selected={(args: any) =>
                console.log("menu selected:", args?.data?.option?.name)
              }
            >
              <image
                class="np-pill-icon"
                src="sys://ellipsis"
                stretch="aspectFit"
                tintColor="#ffffff"
              />
            </gridlayout>
          </gridlayout>

          {/* Progress */}
          <gridlayout class="np-progress" rows="auto, auto">
            <gridlayout class="np-track" row={0}>
              <gridlayout
                class="np-track-fill"
                width={Math.round(player.progress() * 100) + "%"}
              />
            </gridlayout>
            <gridlayout class="np-times" row={1} columns="*, auto">
              <label
                class="np-time"
                col={0}
                text={formatTime(
                  durationSeconds(player.currentTrack().duration) *
                    player.progress(),
                )}
              />
              <label
                class="np-time"
                col={1}
                text={
                  "-" +
                  formatTime(
                    durationSeconds(player.currentTrack().duration) *
                      (1 - player.progress()),
                  )
                }
              />
            </gridlayout>
          </gridlayout>

          {/* Playback controls */}
          <gridlayout class="np-controls" columns="*, *, *" rows="auto">
            <image
              class="np-skip"
              col={0}
              src="sys://backward.fill"
              stretch="aspectFit"
              tintColor="#ffffff"
              on:tap={() => player.skipBackward()}
            />
            <image
              class="np-play"
              col={1}
              src={player.isPlaying() ? "sys://pause.fill" : "sys://play.fill"}
              stretch="aspectFit"
              tintColor="#ffffff"
              on:tap={() => player.togglePlay()}
            />
            <image
              class="np-skip"
              col={2}
              src="sys://forward.fill"
              stretch="aspectFit"
              tintColor="#ffffff"
              on:tap={() => player.skipForward()}
            />
          </gridlayout>

          {/* Volume */}
          <gridlayout class="np-volume" columns="auto, *, auto" rows="auto">
            <image
              class="np-vol-icon np-vol-min"
              col={0}
              src="sys://speaker.fill"
              tintColor="#ffffff"
            />
            <gridlayout class="np-vol-track" col={1}>
              <gridlayout class="np-vol-fill" />
            </gridlayout>
            <image
              class="np-vol-icon np-vol-max"
              col={2}
              src="sys://speaker.wave.3.fill"
              tintColor="#ffffff"
            />
          </gridlayout>

          {/* Actions: lyrics, output device, queue */}
          <gridlayout class="np-actions" columns="*, *, *" rows="auto">
            <image
              class="np-action"
              col={0}
              src="sys://quote.bubble"
              stretch="aspectFit"
              tintColor="#ffffff"
            />
            <image
              class="np-action np-action-active"
              col={1}
              src="sys://airpods"
              stretch="aspectFit"
              tintColor="#ffffff"
            />
            <image
              class="np-action"
              col={2}
              src="sys://list.bullet"
              stretch="aspectFit"
              tintColor="#ffffff"
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
          shadow: { opacity: 0.35, radius: 28, offset: { x: 0, y: 10 } },
        },
      },
    }) as any,
    closeCallback: () => {
      dispose?.();
    },
  };

  launcher.showModal(modalPage, options);
}
