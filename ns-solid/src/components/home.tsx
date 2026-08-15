import { onSettled } from 'solid-js'
import type { TabView } from '@nativescript/core'
import ListenNow from './screens/listen-now'
import Browse from './screens/browse'
import Radio from './screens/radio'
import Library from './screens/library'
import Search from './screens/search'
import NowPlayingBar from './now-playing-bar'

export default function Home() {
  let tabViewRef!: TabView

  const accessoryView: any = (
    <gridlayout>
      <NowPlayingBar />
    </gridlayout>
  )

  onSettled(() => {
    if (tabViewRef) {
      ;(tabViewRef as any).iosBottomAccessory = accessoryView
      ;(tabViewRef as any).iosTabBarMinimizeBehavior = 'onScrollDown'
    }
  })

  return (
    <tabview
      ref={(el: any) => (tabViewRef = el)}
      selectedIndex={0}
      tabTextFontSize="11"
      selectedTabTextColor="#FF375F"
    >
      <tabviewitem title="Home" iconSource="sys://house.fill">
        <frame><ListenNow /></frame>
      </tabviewitem>
      <tabviewitem title="New" iconSource="sys://square.grid.2x2.fill">
        <frame><Browse /></frame>
      </tabviewitem>
      <tabviewitem title="Radio" iconSource="sys://dot.radiowaves.left.and.right">
        <frame><Radio /></frame>
      </tabviewitem>
      <tabviewitem title="Library" iconSource="sys://music.note.square.stack.fill">
        <frame><Library /></frame>
      </tabviewitem>
      <tabviewitem title="Search" iconSource="sys://magnifyingglass" role="search">
        <frame><Search /></frame>
      </tabviewitem>
    </tabview>
  )
}
