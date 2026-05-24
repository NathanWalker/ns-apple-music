<template>
  <Page actionBarHidden="true">
    <TabView
      :selectedIndex="0"
      tabTextFontSize="11"
      selectedTabTextColor="#FF375F"
      @loaded="onTabViewLoaded"
    >
      <TabViewItem title="Home" iconSource="sys://house.fill">
        <Frame>
          <ListenNow />
        </Frame>
      </TabViewItem>
      <TabViewItem title="New" iconSource="sys://square.grid.2x2.fill">
        <Frame>
          <Browse />
        </Frame>
      </TabViewItem>
      <TabViewItem title="Radio" iconSource="sys://dot.radiowaves.left.and.right">
        <Frame>
          <Radio />
        </Frame>
      </TabViewItem>
      <TabViewItem title="Library" iconSource="sys://music.note.square.stack.fill">
        <Frame>
          <Library />
        </Frame>
      </TabViewItem>
      <TabViewItem title="Search" iconSource="sys://magnifyingglass" role="search">
        <Frame>
          <Search />
        </Frame>
      </TabViewItem>
    </TabView>
  </Page>
</template>

<script setup lang="ts">
import { createNativeView } from 'nativescript-vue';
import ListenNow from '../screens/ListenNow.vue';
import Browse from '../screens/Browse.vue';
import Radio from '../screens/Radio.vue';
import Library from '../screens/Library.vue';
import Search from '../screens/Search.vue';
import NowPlayingBar from './NowPlayingBar.vue';

function onTabViewLoaded(args: any) {
  const tabView: any = args.object;

  const barView = createNativeView(NowPlayingBar);
  barView.mount();

  tabView.iosBottomAccessory = barView.nativeView;
  tabView.iosTabBarMinimizeBehavior = 'onScrollDown';
}
</script>
