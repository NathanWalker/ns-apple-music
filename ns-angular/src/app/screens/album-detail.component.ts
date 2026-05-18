import { ChangeDetectionStrategy, Component, NO_ERRORS_SCHEMA, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NativeDialog, NativeScriptCommonModule, RouterExtensions } from '@nativescript/angular';
import { Page } from '@nativescript/core';
import type { MenuAction } from '@nstudio/nativescript-menu';
import { albumById } from '../music';
import { player } from '../player';
import { fg, muted, surface } from '../appearance';
import { openNowPlaying } from './now-playing.component';
import { isLightColor, sampleAverageColor } from '../image-color';

@Component({
  selector: 'ns-album-detail',
  template: `
    <GridLayout rows="auto,*" [backgroundColor]="bgColor">
        <!-- Custom back row -->
        <GridLayout columns="auto, *, auto" rows="auto" class="px-4 pt-2 pb-2">
          <Image
            col="0"
            src="sys://chevron.left"
            width="22"
            height="22"
            [tintColor]="textColor"
            (tap)="goBack()"
          ></Image>
          <Image
            col="2"
            src="sys://ellipsis.circle"
            width="24"
            height="24"
            [tintColor]="textColor"
            [menu]="ellipsisMenu"
            (selected)="onMenuSelected($event)"
          ></Image>
        </GridLayout>
        <ScrollView row="1">
          <StackLayout class="pb-24">
            <!-- Hero artwork -->
            <StackLayout class="px-5 pt-4">
              <GridLayout horizontalAlignment="center">
                <ImageCacheIt
                  [src]="album.artwork"
                  width="280"
                  height="280"
                  stretch="aspectFill"
                  borderRadius="12"
                  [sharedTransitionTag]="sourceTag"
                ></ImageCacheIt>
              </GridLayout>
              <Label
                [text]="album.title"
                class="text-2xl font-bold text-center pt-4"
                [color]="textColor"
              ></Label>
              <Label
                [text]="album.artist"
                class="text-base text-center"
                [color]="album.accent"
              ></Label>
              <Label
                [text]="'Album • ' + album.year"
                class="text-sm text-center pt-1"
                [color]="mutedColor"
              ></Label>
            </StackLayout>

            <!-- Play / Shuffle buttons -->
            <GridLayout columns="*, *" rows="auto" class="px-5 pt-5">
              <GridLayout
                col="0"
                height="48"
                borderRadius="10"
                class="mr-2"
                [backgroundColor]="surfaceColor"
                (tap)="play(0)"
              >
                <StackLayout
                  orientation="horizontal"
                  horizontalAlignment="center"
                  verticalAlignment="center"
                >
                  <Image src="sys://play.fill" width="16" height="16" [tintColor]="album.accent"></Image>
                  <Label
                    text="Play"
                    class="text-base font-semibold pl-2"
                    [color]="album.accent"
                  ></Label>
                </StackLayout>
              </GridLayout>
              <GridLayout
                col="1"
                height="48"
                borderRadius="10"
                class="ml-2"
                [backgroundColor]="surfaceColor"
                (tap)="shuffle()"
              >
                <StackLayout
                  orientation="horizontal"
                  horizontalAlignment="center"
                  verticalAlignment="center"
                >
                  <Image src="sys://shuffle" width="16" height="16" [tintColor]="album.accent"></Image>
                  <Label
                    text="Shuffle"
                    class="text-base font-semibold pl-2"
                    [color]="album.accent"
                  ></Label>
                </StackLayout>
              </GridLayout>
            </GridLayout>

            <!-- Tagline -->
            @if (album.tagline) {
              <Label
                [text]="album.tagline"
                class="text-sm px-5 pt-4"
                [color]="mutedColor"
                textWrap="true"
              ></Label>
            }

            <!-- Tracks -->
            <StackLayout class="px-5 pt-5">
              @for (track of album.tracks; track $index; let i = $index) {
                <GridLayout
                  columns="32, *, auto"
                  rows="auto"
                  class="py-3"
                  (tap)="play(i)"
                >
                  <Label
                    col="0"
                    [text]="(i + 1).toString()"
                    class="text-base"
                    [color]="mutedColor"
                    verticalAlignment="center"
                  ></Label>
                  <StackLayout col="1" verticalAlignment="center">
                    <Label
                      [text]="track.title"
                      class="text-base"
                      [color]="textColor"
                      maxLines="1"
                      textWrap="false"
                    ></Label>
                  </StackLayout>
                  <Label
                    col="2"
                    [text]="track.duration"
                    class="text-sm"
                    [color]="mutedColor"
                    verticalAlignment="center"
                  ></Label>
                </GridLayout>
              }
            </StackLayout>
          </StackLayout>
        </ScrollView>
      </GridLayout>
  `,
  imports: [NativeScriptCommonModule],
  schemas: [NO_ERRORS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlbumDetailComponent {
  private route = inject(ActivatedRoute);
  private routerExt = inject(RouterExtensions);
  private page = inject(Page);
  private dialog = inject(NativeDialog);

  album = albumById(this.route.snapshot.params['id']);
  sourceTag: string = this.route.snapshot.queryParams['sourceTag'];

  constructor() {
    this.page.actionBarHidden = true;
  }

  private sampled = sampleAverageColor(this.album.artwork);
  private onDark = this.sampled ? !isLightColor(this.sampled) : true;

  bgColor: string | undefined = this.sampled?.hex;
  textColor = this.sampled ? (this.onDark ? '#ffffff' : '#0c0c0c') : fg();
  mutedColor = this.sampled
    ? this.onDark
      ? 'rgba(255,255,255,0.6)'
      : 'rgba(0,0,0,0.55)'
    : muted();
  surfaceColor = this.sampled
    ? this.onDark
      ? 'rgba(255,255,255,0.18)'
      : 'rgba(0,0,0,0.08)'
    : surface();

  ellipsisMenu: MenuAction[] = [
    {
      name: '',
      childrenStyle: 'palette',
      children: [
        { id: 1, name: 'Add', icon: 'plus' },
        { id: 2, name: 'Favorite', icon: 'star' },
        { id: 3, name: 'Share', icon: 'square.and.arrow.up' },
      ],
    },
    { id: 4, name: 'Add to Playlist', icon: 'text.badge.plus' },
    { id: 5, name: 'Create Station', icon: 'badge.plus.radiowaves.right' },
    { id: 6, name: 'Go to Album', subtitle: this.album.title, icon: 'square.stack' },
    { id: 7, name: 'Go to Artist', subtitle: this.album.artist, icon: 'music.mic' },
    { id: 8, name: 'View Credits', icon: 'info.circle' },
    { id: 9, name: 'Share Lyrics', icon: 'quote.bubble' },
    {
      id: 10,
      name: 'Suggest Less',
      icon: 'hand.thumbsdown',
      destructive: true,
    },
  ];

  goBack() {
    this.routerExt.back();
  }

  play(trackIndex = 0) {
    player.playAlbum(this.album, trackIndex);
    openNowPlaying(this.dialog);
  }

  shuffle() {
    this.play(Math.floor(Math.random() * this.album.tracks.length));
  }

  onMenuSelected(args: any) {
    console.log('menu selected:', args?.data?.option?.name);
  }
}
