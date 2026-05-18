import { ChangeDetectionStrategy, Component, NO_ERRORS_SCHEMA, inject } from '@angular/core';
import { NativeDialog, NativeScriptCommonModule } from '@nativescript/angular';
import { player } from '../player';
import { fg, muted } from '../appearance';
import { openNowPlaying } from '../screens/now-playing.component';

@Component({
  selector: 'ns-now-playing-bar',
  template: `
    <GridLayout
      columns="48, *, 36, 36"
      rows="48"
      padding="0 12"
      verticalAlignment="center"
      (tap)="open()"
    >
      <ImageCacheIt
        col="0"
        [src]="player.currentAlbum().artwork"
        width="32"
        height="32"
        stretch="aspectFill"
        borderRadius="5"
        verticalAlignment="center"
        sharedTransitionTag="albumArt"
      ></ImageCacheIt>
      <StackLayout col="1" verticalAlignment="center" padding="0 0 0 4">
        <Label
          [text]="player.currentTrack().title"
          [color]="fg()"
          fontSize="15"
          fontWeight="600"
          maxLines="1"
          textWrap="false"
        ></Label>
        <Label
          [text]="player.currentAlbum().artist"
          [color]="muted()"
          fontSize="13"
          maxLines="1"
          textWrap="false"
        ></Label>
      </StackLayout>
      <Image
        col="2"
        [src]="player.isPlaying() ? 'sys://pause.fill' : 'sys://play.fill'"
        width="20"
        height="20"
        stretch="aspectFit"
        [tintColor]="fg()"
        verticalAlignment="center"
        horizontalAlignment="center"
        (tap)="togglePlay($event)"
      ></Image>
      <Image
        col="3"
        src="sys://forward.fill"
        width="20"
        height="20"
        stretch="aspectFit"
        [tintColor]="fg()"
        verticalAlignment="center"
        horizontalAlignment="center"
        (tap)="skipForward($event)"
      ></Image>
    </GridLayout>
  `,
  imports: [NativeScriptCommonModule],
  schemas: [NO_ERRORS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NowPlayingBarComponent {
  private dialog = inject(NativeDialog);
  player = player;
  fg = fg;
  muted = muted;

  open() {
    openNowPlaying(this.dialog);
  }

  togglePlay() {
    player.togglePlay();
  }

  skipForward() {
    player.skipForward();
  }
}
