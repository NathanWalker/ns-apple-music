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
import { topPicks, recentlyPlayed, madeForYou } from "../music";
import { fg, muted } from "../appearance";
import { albumArtTag, openAlbum } from "../album-navigation";

const HERO = "listen-now-hero";
const TOP_PICKS = "listen-now-top-picks";
const RECENTLY_PLAYED = "listen-now-recently-played";
const MADE_FOR_YOU = "listen-now-made-for-you";

@Component({
  selector: "ns-listen-now",
  template: `
    <ActionBar title="Listen Now" iosLargeTitle="true">
      <ActionItem
        icon="sys://person.crop.circle.fill"
        ios.position="right"
      ></ActionItem>
    </ActionBar>
    <ScrollView iosContentInsetAdjustmentBehavior="automatic">
      <StackLayout class="pb-32">
        <!-- Hero card -->
        <GridLayout class="px-5 pt-3">
          <GridLayout
            rows="*"
            columns="*"
            borderRadius="14"
            class="overflow-hidden"
            (tap)="open(topPicks[0], HERO)"
          >
            <ImageCacheIt
              [src]="topPicks[0].artwork"
              stretch="aspectFill"
              height="380"
              borderRadius="14"
              [sharedTransitionTag]="tag(HERO, topPicks[0])"
            ></ImageCacheIt>
            <StackLayout
              verticalAlignment="bottom"
              class="p-4"
              sharedTransitionTag="albumInfo"
            >
              <Label
                text="FEATURED ALBUM"
                class="text-xs font-bold"
                color="#ffffff"
                opacity="0.85"
              ></Label>
              <Label
                [text]="topPicks[0].title"
                class="text-3xl font-bold"
                color="#ffffff"
              ></Label>
              <Label
                [text]="topPicks[0].artist"
                class="text-base"
                color="#ffffff"
                opacity="0.85"
              ></Label>
            </StackLayout>
          </GridLayout>
        </GridLayout>

        <!-- Top Picks horizontal -->
        <StackLayout class="pt-7">
          <Label
            text="Top Picks"
            class="text-2xl font-bold px-5"
            [color]="fg()"
          ></Label>
          <ScrollView orientation="horizontal">
            <StackLayout orientation="horizontal" class="px-5 pt-3">
              @for (album of topPicksTail; track album.id) {
                <StackLayout
                  class="mr-4"
                  width="200"
                  (tap)="open(album, TOP_PICKS)"
                >
                  <ImageCacheIt
                    [src]="album.artwork"
                    width="200"
                    height="200"
                    stretch="aspectFill"
                    borderRadius="10"
                    [sharedTransitionTag]="tag(TOP_PICKS, album)"
                  ></ImageCacheIt>
                  <Label
                    [text]="album.title"
                    class="text-base pt-2"
                    [color]="fg()"
                    maxLines="1"
                    textWrap="false"
                  ></Label>
                  <Label
                    [text]="album.artist"
                    class="text-sm"
                    [color]="muted()"
                    maxLines="1"
                    textWrap="false"
                  ></Label>
                </StackLayout>
              }
            </StackLayout>
          </ScrollView>
        </StackLayout>

        <!-- Recently Played row list -->
        <StackLayout class="pt-7">
          <Label
            text="Recently Played"
            class="text-2xl font-bold px-5"
            [color]="fg()"
          ></Label>
          <StackLayout class="px-5 pt-3">
            @for (album of recentlyPlayed; track album.id) {
              <GridLayout
                columns="64, *, auto"
                rows="auto"
                class="py-2"
                (tap)="open(album, RECENTLY_PLAYED)"
              >
                <ImageCacheIt
                  col="0"
                  [src]="album.artwork"
                  width="56"
                  height="56"
                  stretch="aspectFill"
                  borderRadius="6"
                  [sharedTransitionTag]="tag(RECENTLY_PLAYED, album)"
                ></ImageCacheIt>
                <StackLayout col="1" verticalAlignment="center" class="pl-3">
                  <Label
                    [text]="album.title"
                    class="text-base"
                    [color]="fg()"
                    maxLines="1"
                    textWrap="false"
                  ></Label>
                  <Label
                    [text]="album.artist"
                    class="text-sm"
                    [color]="muted()"
                    maxLines="1"
                    textWrap="false"
                  ></Label>
                </StackLayout>
                <Image
                  col="2"
                  src="sys://chevron.right"
                  width="14"
                  height="14"
                  tintColor="#8e8e93"
                  verticalAlignment="center"
                ></Image>
              </GridLayout>
            }
          </StackLayout>
        </StackLayout>

        <!-- Made For You -->
        <StackLayout class="pt-7">
          <Label
            text="Made For You"
            class="text-2xl font-bold px-5"
            [color]="fg()"
          ></Label>
          <ScrollView orientation="horizontal">
            <StackLayout orientation="horizontal" class="px-5 pt-3">
              @for (album of madeForYou; track album.id) {
                <StackLayout
                  class="mr-4"
                  width="160"
                  (tap)="open(album, MADE_FOR_YOU)"
                >
                  <ImageCacheIt
                    [src]="album.artwork"
                    width="160"
                    height="160"
                    stretch="aspectFill"
                    borderRadius="10"
                    [sharedTransitionTag]="tag(MADE_FOR_YOU, album)"
                  ></ImageCacheIt>
                  <Label
                    [text]="album.title"
                    class="text-sm pt-2"
                    [color]="fg()"
                    maxLines="1"
                    textWrap="false"
                  ></Label>
                  <Label
                    [text]="album.artist"
                    class="text-xs"
                    [color]="muted()"
                    maxLines="1"
                    textWrap="false"
                  ></Label>
                </StackLayout>
              }
            </StackLayout>
          </ScrollView>
        </StackLayout>
      </StackLayout>
    </ScrollView>
  `,
  imports: [NativeScriptCommonModule],
  schemas: [NO_ERRORS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListenNowComponent {
  private router = inject(RouterExtensions);
  topPicks = topPicks;
  topPicksTail = topPicks.slice(1);
  recentlyPlayed = recentlyPlayed;
  madeForYou = madeForYou;
  fg = fg;
  muted = muted;

  readonly HERO = HERO;
  readonly TOP_PICKS = TOP_PICKS;
  readonly RECENTLY_PLAYED = RECENTLY_PLAYED;
  readonly MADE_FOR_YOU = MADE_FOR_YOU;

  tag = albumArtTag;

  open(album: (typeof topPicks)[number], section: string) {
    openAlbum(this.router, album, section);
  }
}
