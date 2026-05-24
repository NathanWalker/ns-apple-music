import {
  ChangeDetectionStrategy,
  Component,
  NO_ERRORS_SCHEMA,
  inject,
} from "@angular/core";
import {
  NativeScriptCommonModule,
  RouterExtensions,
} from "@nativescript/angular";
import { newReleases, type Album } from "../music";
import { fg, muted } from "../appearance";
import { chunks } from "../chunks";
import { albumArtTag, openAlbum } from "../album-navigation";

const HERO = "browse-hero";
const HOT_TRACKS = "browse-hot-tracks";

@Component({
  selector: "ns-browse",
  template: `
    <ActionBar title="New" iosLargeTitle="true">
      <ActionItem
        icon="sys://person.crop.circle.fill"
        ios.position="right"
      ></ActionItem>
    </ActionBar>
    <ScrollView iosContentInsetAdjustmentBehavior="automatic">
      <StackLayout class="pb-32">
        <StackLayout class="px-5 pt-3">
          <GridLayout
            rows="*"
            columns="*"
            borderRadius="14"
            class="overflow-hidden"
            (tap)="open(hero, HERO)"
          >
            <ImageCacheIt
              [src]="hero.artwork"
              stretch="aspectFill"
              height="320"
              borderRadius="14"
              [sharedTransitionTag]="tag(HERO, hero)"
            ></ImageCacheIt>
            <StackLayout verticalAlignment="bottom" class="p-4">
              <Label
                text="NEW RELEASE"
                class="text-xs font-bold"
                color="#ffffff"
                opacity="0.85"
              ></Label>
              <Label
                [text]="hero.title"
                class="text-3xl font-bold"
                color="#ffffff"
              ></Label>
              <Label
                [text]="hero.artist"
                class="text-base"
                color="#ffffff"
                opacity="0.85"
              ></Label>
            </StackLayout>
          </GridLayout>
        </StackLayout>

        <Label
          text="Hot Tracks"
          class="text-2xl font-bold px-5 pt-7 pb-2"
          [color]="fg()"
        ></Label>
        @for (pair of pairs; track pair[0].id) {
          <GridLayout columns="*, *" rows="auto" class="px-5 pb-3">
            <StackLayout col="0" class="pr-2" (tap)="open(pair[0], HOT_TRACKS)">
              <ImageCacheIt
                [src]="pair[0].artwork"
                stretch="aspectFill"
                height="170"
                borderRadius="10"
                [sharedTransitionTag]="tag(HOT_TRACKS, pair[0])"
              ></ImageCacheIt>
              <Label
                [text]="pair[0].title"
                class="text-base pt-2"
                [color]="fg()"
                maxLines="1"
                textWrap="false"
              ></Label>
              <Label
                [text]="pair[0].artist"
                class="text-sm"
                [color]="muted()"
                maxLines="1"
                textWrap="false"
              ></Label>
            </StackLayout>
            @if (pair[1]; as second) {
              <StackLayout
                col="1"
                class="pl-2"
                (tap)="open(second, HOT_TRACKS)"
              >
                <ImageCacheIt
                  [src]="second.artwork"
                  stretch="aspectFill"
                  height="170"
                  borderRadius="10"
                  [sharedTransitionTag]="tag(HOT_TRACKS, second)"
                ></ImageCacheIt>
                <Label
                  [text]="second.title"
                  class="text-base pt-2"
                  [color]="fg()"
                  maxLines="1"
                  textWrap="false"
                ></Label>
                <Label
                  [text]="second.artist"
                  class="text-sm"
                  [color]="muted()"
                  maxLines="1"
                  textWrap="false"
                ></Label>
              </StackLayout>
            }
          </GridLayout>
        }
      </StackLayout>
    </ScrollView>
  `,
  imports: [NativeScriptCommonModule],
  schemas: [NO_ERRORS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrowseComponent {
  private router = inject(RouterExtensions);
  hero: Album = newReleases[0];
  pairs: Album[][] = chunks(newReleases.slice(1), 2);
  fg = fg;
  muted = muted;
  readonly HERO = HERO;
  readonly HOT_TRACKS = HOT_TRACKS;
  tag = albumArtTag;

  open(album: Album, section: string) {
    openAlbum(this.router, album, section);
  }
}
