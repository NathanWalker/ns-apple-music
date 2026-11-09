import { createSignal } from 'solid-js'

// Lives outside the component tree so an HMR remount (which rebuilds the
// TabView from a freshly imported /src/app) reopens on the tab the user was on.
const [selectedTab, setSelectedTab] = createSignal(0)

export const ui = { selectedTab, setSelectedTab }
