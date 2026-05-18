<template>
  <Page>
    <ActionBar title="Listen Now" iosLargeTitle="true">
      <ActionItem icon="sys://person.crop.circle.fill" @loaded="setRightPos" />
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
            @tap="() => openAlbum(featured, HERO)"
          >
            <ImageCacheIt
              :src="featured.artwork"
              stretch="aspectFill"
              height="380"
              borderRadius="14"
              :sharedTransitionTag="albumArtTag(HERO, featured)"
            />
            <StackLayout verticalAlignment="bottom" class="p-4" sharedTransitionTag="albumInfo">
              <Label text="FEATURED ALBUM" class="text-xs font-bold" color="#ffffff" opacity="0.85" />
              <Label :text="featured.title" class="text-3xl font-bold" color="#ffffff" />
              <Label :text="featured.artist" class="text-base" color="#ffffff" opacity="0.85" />
            </StackLayout>
          </GridLayout>
        </GridLayout>

        <!-- Top Picks horizontal -->
        <StackLayout class="pt-7">
          <Label text="Top Picks" class="text-2xl font-bold px-5" :color="fg" />
          <ScrollView orientation="horizontal">
            <StackLayout orientation="horizontal" class="px-5 pt-3">
              <StackLayout
                v-for="album in topPicksTail"
                :key="album.id"
                class="mr-4"
                width="200"
                @tap="() => openAlbum(album, TOP_PICKS)"
              >
                <ImageCacheIt
                  :src="album.artwork"
                  width="200"
                  height="200"
                  stretch="aspectFill"
                  borderRadius="10"
                  :sharedTransitionTag="albumArtTag(TOP_PICKS, album)"
                />
                <Label :text="album.title" class="text-base pt-2" :color="fg" maxLines="1" textWrap="false" />
                <Label :text="album.artist" class="text-sm" :color="muted" maxLines="1" textWrap="false" />
              </StackLayout>
            </StackLayout>
          </ScrollView>
        </StackLayout>

        <!-- Recently Played row list -->
        <StackLayout class="pt-7">
          <Label text="Recently Played" class="text-2xl font-bold px-5" :color="fg" />
          <StackLayout class="px-5 pt-3">
            <GridLayout
              v-for="album in recentlyPlayed"
              :key="album.id"
              columns="64, *, auto"
              rows="auto"
              class="py-2"
              @tap="() => openAlbum(album, RECENTLY_PLAYED)"
            >
              <ImageCacheIt
                col="0"
                :src="album.artwork"
                width="56"
                height="56"
                stretch="aspectFill"
                borderRadius="6"
                :sharedTransitionTag="albumArtTag(RECENTLY_PLAYED, album)"
              />
              <StackLayout col="1" verticalAlignment="center" class="pl-3">
                <Label :text="album.title" class="text-base" :color="fg" maxLines="1" textWrap="false" />
                <Label :text="album.artist" class="text-sm" :color="muted" maxLines="1" textWrap="false" />
              </StackLayout>
              <Image col="2" src="sys://chevron.right" width="14" height="14" tintColor="#8e8e93" verticalAlignment="center" />
            </GridLayout>
          </StackLayout>
        </StackLayout>

        <!-- Made For You -->
        <StackLayout class="pt-7">
          <Label text="Made For You" class="text-2xl font-bold px-5" :color="fg" />
          <ScrollView orientation="horizontal">
            <StackLayout orientation="horizontal" class="px-5 pt-3">
              <StackLayout
                v-for="album in madeForYou"
                :key="album.id"
                class="mr-4"
                width="160"
                @tap="() => openAlbum(album, MADE_FOR_YOU)"
              >
                <ImageCacheIt
                  :src="album.artwork"
                  width="160"
                  height="160"
                  stretch="aspectFill"
                  borderRadius="10"
                  :sharedTransitionTag="albumArtTag(MADE_FOR_YOU, album)"
                />
                <Label :text="album.title" class="text-sm pt-2" :color="fg" maxLines="1" textWrap="false" />
                <Label :text="album.artist" class="text-xs" :color="muted" maxLines="1" textWrap="false" />
              </StackLayout>
            </StackLayout>
          </ScrollView>
        </StackLayout>
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script setup lang="ts">
import { topPicks, recentlyPlayed, madeForYou } from '../music';
import { fg, muted } from '../appearance';
import { albumArtTag, openAlbum } from '../album-navigation';

const HERO = 'listen-now-hero';
const TOP_PICKS = 'listen-now-top-picks';
const RECENTLY_PLAYED = 'listen-now-recently-played';
const MADE_FOR_YOU = 'listen-now-made-for-you';

const featured = topPicks[0];
const topPicksTail = topPicks.slice(1);

function setRightPos(args: any) {
  const obj = args?.object;
  if (obj?.ios) obj.ios.position = 'right';
}
</script>
