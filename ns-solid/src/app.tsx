import { Route, RouteDefinition, StackRouter } from 'solid-navigation'
import Home from './components/home'
import AlbumDetail from './components/screens/album-detail'

declare module 'solid-navigation' {
  export interface Routers {
    Default: {
      Home: RouteDefinition
      Album: RouteDefinition<{ albumId: string; sourceTag: string }>
    }
  }
}

const App = () => {
  return (
    <StackRouter
      initialRouteName="Home"
      defaultRouteOptions={{ noHeader: true }}
      useTopMostFrame={true}
    >
      <Route name="Home" component={Home} />
      <Route name="Album" component={AlbumDetail} />
    </StackRouter>
  )
}

export { App }
