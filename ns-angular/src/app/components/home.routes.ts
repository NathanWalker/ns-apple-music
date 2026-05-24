import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';

export const homeRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'listen-now',
        loadComponent: () =>
          import('../screens/listen-now.component').then(
            (m) => m.ListenNowComponent
          ),
        outlet: 'listenNowTab',
      },
      {
        path: 'browse',
        loadComponent: () =>
          import('../screens/browse.component').then((m) => m.BrowseComponent),
        outlet: 'browseTab',
      },
      {
        path: 'radio',
        loadComponent: () =>
          import('../screens/radio.component').then((m) => m.RadioComponent),
        outlet: 'radioTab',
      },
      {
        path: 'library',
        loadComponent: () =>
          import('../screens/library.component').then(
            (m) => m.LibraryComponent
          ),
        outlet: 'libraryTab',
      },
      {
        path: 'search',
        loadComponent: () =>
          import('../screens/search.component').then((m) => m.SearchComponent),
        outlet: 'searchTab',
      },
    ],
  },
];
