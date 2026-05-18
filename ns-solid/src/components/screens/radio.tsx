import { For } from "solid-js";
import { radioStations } from "../../data/music";
import { useAppearance } from "../../state/appearance";

export default function Radio() {
  const { fg, muted } = useAppearance();
  return (
    <page>
      <actionbar title="Radio" iosLargeTitle="true">
        <actionitem
          icon="sys://person.crop.circle.fill"
          ref={(el: any) => {
            if (el) el.ios.position = "right";
          }}
        />
      </actionbar>
      <scrollview iosContentInsetAdjustmentBehavior="automatic">
        <stacklayout class="pb-32">
          <stacklayout class="px-5 pt-2">
            <gridlayout
              rows="*"
              columns="*"
              borderRadius="14"
              class="overflow-hidden"
            >
              <imagecacheit
                src={radioStations[0].artwork}
                stretch="aspectFill"
                height="240"
                borderRadius="14"
              />
              <stacklayout verticalAlignment="bottom" class="p-4">
                <label text="LIVE" class="text-xs font-bold" color="#ff375f" />
                <label
                  text={radioStations[0].title}
                  class="text-2xl font-bold"
                  color="#ffffff"
                />
                <label
                  text={radioStations[0].subtitle}
                  class="text-sm"
                  color="#ffffff"
                  opacity="0.85"
                />
              </stacklayout>
            </gridlayout>
          </stacklayout>

          <label
            text="Stations"
            class="text-2xl font-bold px-5 pt-7 pb-2"
            color={fg()}
          />
          <stacklayout class="px-5">
            <For each={radioStations}>
              {(station) => (
                <gridlayout columns="64, *, auto" rows="auto" class="py-2">
                  <imagecacheit
                    col={0}
                    src={station.artwork}
                    width="56"
                    height="56"
                    stretch="aspectFill"
                    borderRadius="6"
                  />
                  <stacklayout col={1} verticalAlignment="center" class="pl-3">
                    <label
                      text={station.title}
                      class="text-base"
                      color={fg()}
                      maxLines="1"
                      textWrap="false"
                    />
                    <label
                      text={station.subtitle}
                      class="text-sm"
                      color={muted()}
                      maxLines="1"
                      textWrap="false"
                    />
                  </stacklayout>
                  <image
                    col={2}
                    src="sys://play.circle.fill"
                    width="32"
                    height="32"
                    tintColor="#ff375f"
                    verticalAlignment="center"
                  />
                </gridlayout>
              )}
            </For>
          </stacklayout>
        </stacklayout>
      </scrollview>
    </page>
  );
}
