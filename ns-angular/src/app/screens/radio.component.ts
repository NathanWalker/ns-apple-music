import {
  ChangeDetectionStrategy,
  Component,
  NO_ERRORS_SCHEMA,
} from "@angular/core";
import { NativeScriptCommonModule } from "@nativescript/angular";
import { radioStations } from "../music";
import { fg, muted } from "../appearance";

@Component({
  selector: "ns-radio",
  template: `
    <ActionBar title="Radio" iosLargeTitle="true">
      <ActionItem
        icon="sys://person.crop.circle.fill"
        ios.position="right"
      ></ActionItem>
    </ActionBar>
    <ScrollView iosContentInsetAdjustmentBehavior="automatic">
      <StackLayout class="pb-32">
        <StackLayout class="px-5 pt-2">
          <GridLayout
            rows="*"
            columns="*"
            borderRadius="14"
            class="overflow-hidden"
          >
            <ImageCacheIt
              [src]="radioStations[0].artwork"
              stretch="aspectFill"
              height="240"
              borderRadius="14"
            ></ImageCacheIt>
            <StackLayout verticalAlignment="bottom" class="p-4">
              <Label
                text="LIVE"
                class="text-xs font-bold"
                color="#ff375f"
              ></Label>
              <Label
                [text]="radioStations[0].title"
                class="text-2xl font-bold"
                color="#ffffff"
              ></Label>
              <Label
                [text]="radioStations[0].subtitle"
                class="text-sm"
                color="#ffffff"
                opacity="0.85"
              ></Label>
            </StackLayout>
          </GridLayout>
        </StackLayout>

        <Label
          text="Stations"
          class="text-2xl font-bold px-5 pt-7 pb-2"
          [color]="fg()"
        ></Label>
        <StackLayout class="px-5">
          @for (station of radioStations; track station.id) {
            <GridLayout columns="64, *, auto" rows="auto" class="py-2">
              <ImageCacheIt
                col="0"
                [src]="station.artwork"
                width="56"
                height="56"
                stretch="aspectFill"
                borderRadius="6"
              ></ImageCacheIt>
              <StackLayout col="1" verticalAlignment="center" class="pl-3">
                <Label
                  [text]="station.title"
                  class="text-base"
                  [color]="fg()"
                  maxLines="1"
                  textWrap="false"
                ></Label>
                <Label
                  [text]="station.subtitle"
                  class="text-sm"
                  [color]="muted()"
                  maxLines="1"
                  textWrap="false"
                ></Label>
              </StackLayout>
              <Image
                col="2"
                src="sys://play.circle.fill"
                width="32"
                height="32"
                tintColor="#ff375f"
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
export class RadioComponent {
  radioStations = radioStations;
  fg = fg;
  muted = muted;
}
