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
import {
  librarySections,
  playlists,
  recentlyPlayed,
  type Album,
} from "../music";
import { fg, muted } from "../appearance";
import { chunks } from "../chunks";
import { albumArtTag, openAlbum } from "../album-navigation";

const RECENT = "library-recently-added";

@Component({
  selector: "ns-library",
  template: `
    <ActionBar title="Library" iosLargeTitle="true">
      <ActionItem
        icon="sys://person.crop.circle.fill"
        ios.position="right"
      ></ActionItem>
    </ActionBar>
    <ScrollView iosContentInsetAdjustmentBehavior="automatic">
      <StackLayout class="pb-32">
        <StackLayout iosIgnoreSafeArea="true" class="pt-4">
          @for (section of librarySections; track section.id) {
            <GridLayout
              columns="32, *, auto"
              rows="auto"
              class="px-5"
              height="50"
            >
              <Image
                col="0"
                [src]="section.icon"
                width="22"
                height="22"
                tintColor="#ff375f"
                verticalAlignment="center"
                horizontalAlignment="left"
              ></Image>
              <Label
                col="1"
                [text]="section.label"
                class="text-lg pl-3"
                [color]="fg()"
                verticalAlignment="center"
              ></Label>
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

        <Label
          text="Recently Added"
          class="text-2xl font-bold px-5 pt-7 pb-2"
          [color]="fg()"
        ></Label>
        @for (pair of recentPairs; track pair[0].id) {
          <GridLayout columns="*, *" rows="auto" class="px-5 pb-3">
            <StackLayout col="0" class="pr-2" (tap)="open(pair[0], RECENT)">
              <ImageCacheIt
                [src]="pair[0].artwork"
                stretch="aspectFill"
                height="170"
                borderRadius="10"
                [sharedTransitionTag]="tag(RECENT, pair[0])"
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
              <StackLayout col="1" class="pl-2" (tap)="open(second, RECENT)">
                <ImageCacheIt
                  [src]="second.artwork"
                  stretch="aspectFill"
                  height="170"
                  borderRadius="10"
                  [sharedTransitionTag]="tag(RECENT, second)"
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

        <Label
          text="Playlists"
          class="text-2xl font-bold px-5 pt-7 pb-1"
          [color]="fg()"
        ></Label>
        <StackLayout class="px-5">
          @for (pl of playlists; track pl.id) {
            <GridLayout columns="64, *, auto" rows="auto" class="py-2">
              <ImageCacheIt
                col="0"
                [src]="pl.artwork"
                width="56"
                height="56"
                stretch="aspectFill"
                borderRadius="6"
              ></ImageCacheIt>
              <StackLayout col="1" verticalAlignment="center" class="pl-3">
                <Label
                  [text]="pl.title"
                  class="text-base"
                  [color]="fg()"
                  maxLines="1"
                  textWrap="false"
                ></Label>
                <Label
                  [text]="pl.curator"
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
    </ScrollView>
  `,
  imports: [NativeScriptCommonModule],
  schemas: [NO_ERRORS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LibraryComponent {
  private router = inject(RouterExtensions);
  librarySections = librarySections;
  playlists = playlists;
  recentPairs: Album[][] = chunks(recentlyPlayed.slice(0, 4), 2);
  fg = fg;
  muted = muted;
  readonly RECENT = RECENT;
  tag = albumArtTag;

  open(album: Album, section: string) {
    openAlbum(this.router, album, section);
  }
}
