import { For } from "solid-js";
import { useParams, useRouter } from "solid-navigation";
import type { MenuAction } from "@nstudio/nativescript-menu";
import { albumById } from "../../data/music";
import { player } from "../../state/player";
import { useAppearance } from "../../state/appearance";
import { openNowPlaying } from "./now-playing";
import { isLightColor, sampleAverageColor } from "../../utils/image-color";

export default function AlbumDetail() {
  const params = useParams<"Album">();
  const router = useRouter();
  const album = albumById(params.albumId);
  const { fg, muted, surface } = useAppearance();

  // Sample the album artwork's average color and drive the page chrome from
  // it (Apple Music–style). Text and surface colors flip based on perceived
  // luminance so they stay legible on either dark or light artwork. Falls
  // back to the global appearance palette if sampling can't run.
  const sampled = sampleAverageColor(album.artwork);
  const onDark = sampled ? !isLightColor(sampled) : true;
  const bgColor = sampled?.hex;
  const textColor = sampled ? (onDark ? "#ffffff" : "#0c0c0c") : fg();
  const mutedColor = sampled
    ? onDark
      ? "rgba(255,255,255,0.6)"
      : "rgba(0,0,0,0.55)"
    : muted();
  const surfaceColor = sampled
    ? onDark
      ? "rgba(255,255,255,0.18)"
      : "rgba(0,0,0,0.08)"
    : surface();

  const ellipsisMenu: MenuAction[] = [
    {
      name: "",
      childrenStyle: "palette",
      children: [
        { id: 1, name: "Add", icon: "plus" },
        { id: 2, name: "Favorite", icon: "star" },
        { id: 3, name: "Share", icon: "square.and.arrow.up" },
      ],
    },
    { id: 4, name: "Add to Playlist", icon: "text.badge.plus" },
    { id: 5, name: "Create Station", icon: "badge.plus.radiowaves.right" },
    { id: 6, name: "Go to Album", subtitle: album.title, icon: "square.stack" },
    { id: 7, name: "Go to Artist", subtitle: album.artist, icon: "music.mic" },
    { id: 8, name: "View Credits", icon: "info.circle" },
    { id: 9, name: "Share Lyrics", icon: "quote.bubble" },
    {
      id: 10,
      name: "Suggest Less",
      icon: "hand.thumbsdown",
      destructive: true,
    },
  ];

  const play = (trackIndex = 0) => {
    player.playAlbum(album, trackIndex);
    openNowPlaying();
  };

  return (
    <gridlayout rows="auto,*" backgroundColor={bgColor}>
      {/* Custom back row */}
      <gridlayout columns="auto, *, auto" rows="auto" class="px-4 pt-2 pb-2">
        <image
          col={0}
          src="sys://chevron.left"
          width="22"
          height="22"
          tintColor={textColor}
          on:tap={() => router.goBack()}
        />
        <image
          col={2}
          src="sys://ellipsis.circle"
          width="24"
          height="24"
          tintColor={textColor}
          menu={ellipsisMenu}
          on:selected={(args: any) =>
            console.log("menu selected:", args?.data?.option?.name)
          }
        />
      </gridlayout>
      <scrollview row={1}>
        <stacklayout class="pb-24">
          {/* Hero artwork */}
          <stacklayout class="px-5 pt-4">
            <gridlayout horizontalAlignment="center">
              <imagecacheit
                src={album.artwork}
                width="280"
                height="280"
                stretch="aspectFill"
                borderRadius="12"
                sharedTransitionTag={params.sourceTag}
              />
            </gridlayout>
            <label
              text={album.title}
              class="text-2xl font-bold text-center pt-4"
              color={textColor}
            />
            <label
              text={album.artist}
              class="text-base text-center"
              color={album.accent}
            />
            <label
              text={"Album • " + album.year}
              class="text-sm text-center pt-1"
              color={mutedColor}
            />
          </stacklayout>

          {/* Play / Shuffle buttons */}
          <gridlayout columns="*, *" rows="auto" class="px-5 pt-5">
            <gridlayout
              col={0}
              height="48"
              borderRadius="10"
              class="mr-2"
              backgroundColor={surfaceColor}
              on:tap={() => play(0)}
            >
              <stacklayout
                orientation="horizontal"
                horizontalAlignment="center"
                verticalAlignment="center"
              >
                <image
                  src="sys://play.fill"
                  width="16"
                  height="16"
                  tintColor={album.accent}
                />
                <label
                  text="Play"
                  class="text-base font-semibold pl-2"
                  color={album.accent}
                />
              </stacklayout>
            </gridlayout>
            <gridlayout
              col={1}
              height="48"
              borderRadius="10"
              class="ml-2"
              backgroundColor={surfaceColor}
              on:tap={() =>
                play(Math.floor(Math.random() * album.tracks.length))
              }
            >
              <stacklayout
                orientation="horizontal"
                horizontalAlignment="center"
                verticalAlignment="center"
              >
                <image
                  src="sys://shuffle"
                  width="16"
                  height="16"
                  tintColor={album.accent}
                />
                <label
                  text="Shuffle"
                  class="text-base font-semibold pl-2"
                  color={album.accent}
                />
              </stacklayout>
            </gridlayout>
          </gridlayout>

          {/* Tagline */}
          {album.tagline && (
            <label
              text={album.tagline}
              class="text-sm px-5 pt-4"
              color={mutedColor}
              textWrap="true"
            />
          )}

          {/* Tracks */}
          <stacklayout class="px-5 pt-5">
            <For each={album.tracks}>
              {(track, i) => (
                <gridlayout
                  columns="32, *, auto"
                  rows="auto"
                  class="py-3"
                  on:tap={() => play(i())}
                >
                  <label
                    col={0}
                    text={String(i() + 1)}
                    class="text-base"
                    color={mutedColor}
                    verticalAlignment="center"
                  />
                  <stacklayout col={1} verticalAlignment="center">
                    <label
                      text={track.title}
                      class="text-base"
                      color={textColor}
                      maxLines="1"
                      textWrap="false"
                    />
                  </stacklayout>
                  <label
                    col={2}
                    text={track.duration}
                    class="text-sm"
                    color={mutedColor}
                    verticalAlignment="center"
                  />
                </gridlayout>
              )}
            </For>
          </stacklayout>
        </stacklayout>
      </scrollview>
    </gridlayout>
  );
}
