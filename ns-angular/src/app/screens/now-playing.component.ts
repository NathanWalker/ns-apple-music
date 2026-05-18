import {
  ChangeDetectionStrategy,
  Component,
  NO_ERRORS_SCHEMA,
  inject,
} from "@angular/core";
import {
  NativeDialog,
  NativeDialogConfig,
  NativeDialogRef,
  NativeScriptCommonModule,
} from "@nativescript/angular";
import { Color, ModalTransition, SharedTransition } from "@nativescript/core";
import type { MenuAction } from "@nstudio/nativescript-menu";
import { player } from "../player";

function darken(hex: string, amount = 0.35): string {
  const c = new Color(hex);
  const r = Math.max(0, Math.floor(c.r * (1 - amount)));
  const g = Math.max(0, Math.floor(c.g * (1 - amount)));
  const b = Math.max(0, Math.floor(c.b * (1 - amount)));
  return new Color(255, r, g, b).hex;
}

@Component({
  selector: "ns-now-playing",
  template: `
    <GridLayout rows="*" [backgroundColor]="player.currentAlbum().accent">
      <!-- Vibrant gradient backdrop based on the album accent -->
      <GridLayout
        [backgroundColor]="player.currentAlbum().accent"
        [backgroundImage]="bgImage()"
      ></GridLayout>

      <ScrollView>
        <StackLayout class="px-6 pb-10">
          <!-- Drag handle / close -->
          <GridLayout
            class="pt-3 pb-3"
            horizontalAlignment="center"
            (tap)="close()"
          >
            <GridLayout
              width="40"
              height="5"
              borderRadius="3"
              backgroundColor="#ffffff"
              opacity="0.4"
            ></GridLayout>
          </GridLayout>

          <!-- Artwork -->
          <GridLayout horizontalAlignment="center" class="pt-6">
            <ImageCacheIt
              [src]="player.currentAlbum().artwork"
              width="320"
              height="320"
              stretch="aspectFill"
              borderRadius="14"
              sharedTransitionTag="albumArt"
            ></ImageCacheIt>
          </GridLayout>

          <!-- Title block -->
          <GridLayout columns="*, auto" rows="auto" class="pt-7">
            <StackLayout col="0">
              <Label
                [text]="player.currentTrack().title"
                class="on-image text-2xl font-bold text-white"
                maxLines="1"
                textWrap="false"
              ></Label>
              <Label
                [text]="player.currentAlbum().artist"
                class="on-image text-lg text-white"
                opacity="0.75"
                maxLines="1"
                textWrap="false"
              ></Label>
            </StackLayout>
            <Image
              col="1"
              src="sys://ellipsis.circle.fill"
              width="32"
              height="32"
              tintColor="#ffffff"
              opacity="0.7"
              verticalAlignment="center"
              [menu]="ellipsisMenu"
              (selected)="onMenuSelected($event)"
            ></Image>
          </GridLayout>

          <!-- Progress -->
          <GridLayout rows="auto, auto" class="pt-5">
            <GridLayout
              row="0"
              height="4"
              borderRadius="2"
              opacity="0.25"
              class="bg-white"
            >
              <GridLayout
                horizontalAlignment="left"
                [width]="progressWidth()"
                class="bg-white"
                height="4"
                borderRadius="2"
              ></GridLayout>
            </GridLayout>
            <GridLayout row="1" columns="*, auto" class="pt-2">
              <Label
                col="0"
                text="1:23"
                class="on-image text-xs text-white"
                opacity="0.6"
              ></Label>
              <Label
                col="1"
                text="-2:45"
                class="on-image text-xs text-white"
                opacity="0.6"
              ></Label>
            </GridLayout>
          </GridLayout>

          <!-- Playback controls -->
          <GridLayout
            columns="*, *, *"
            rows="auto"
            class="pt-7"
            horizontalAlignment="center"
          >
            <Image
              col="0"
              src="sys://backward.fill"
              width="36"
              height="36"
              tintColor="#ffffff"
              stretch="aspectFit"
              (tap)="player.skipBackward()"
            ></Image>
            <Image
              col="1"
              [src]="
                player.isPlaying() ? 'sys://pause.fill' : 'sys://play.fill'
              "
              width="56"
              height="56"
              tintColor="#ffffff"
              stretch="aspectFit"
              class="px-10"
              (tap)="player.togglePlay()"
            ></Image>
            <Image
              col="2"
              src="sys://forward.fill"
              width="36"
              height="36"
              tintColor="#ffffff"
              stretch="aspectFit"
              (tap)="player.skipForward()"
            ></Image>
          </GridLayout>

          <!-- Volume -->
          <GridLayout columns="auto, *, auto" rows="auto" class="pt-8">
            <Image
              col="0"
              src="sys://speaker.fill"
              width="16"
              height="16"
              tintColor="#ffffff"
              opacity="0.6"
              verticalAlignment="center"
            ></Image>
            <GridLayout
              col="1"
              height="4"
              borderRadius="2"
              backgroundColor="#ffffff"
              opacity="0.25"
              class="mx-3"
              verticalAlignment="center"
            >
              <GridLayout
                horizontalAlignment="left"
                width="55%"
                height="4"
                borderRadius="2"
                backgroundColor="#ffffff"
              ></GridLayout>
            </GridLayout>
            <Image
              col="2"
              src="sys://speaker.wave.3.fill"
              width="20"
              height="20"
              tintColor="#ffffff"
              opacity="0.6"
              verticalAlignment="center"
            ></Image>
          </GridLayout>
        </StackLayout>
      </ScrollView>
    </GridLayout>
  `,
  imports: [NativeScriptCommonModule],
  schemas: [NO_ERRORS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NowPlayingComponent {
  private dialogRef = inject(NativeDialogRef);
  player = player;

  bgImage = () => {
    const accent = player.currentAlbum().accent;
    return `linear-gradient(180deg, ${accent} 0%, ${darken(accent, 0.65)} 100%)`;
  };

  progressWidth = () => Math.round(player.progress() * 100) + "%";

  ellipsisMenu: MenuAction[] = [
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

  close() {
    this.dialogRef.close();
  }

  onMenuSelected(args: any) {
    console.log("menu selected:", args?.data?.option?.name);
  }
}

export function openNowPlaying(dialog: NativeDialog) {
  const config: NativeDialogConfig = {
    nativeOptions: {
      fullscreen: true,
      transition: SharedTransition.custom(new ModalTransition(), {
        pageStart: { cornerRadius: 26 },
        pageEnd: {
          cornerRadius: 50,
          spring: { tension: 65, friction: 11, mass: 1 },
        },
        pageReturn: { cornerRadius: 26 },
        interactive: { dismiss: { finishThreshold: 0.5 } },
      }) as any,
    },
  };
  dialog.open(NowPlayingComponent, config);
}
