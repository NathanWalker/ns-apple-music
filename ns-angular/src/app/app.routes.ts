import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./components/home.routes').then((m) => m.homeRoutes),
  },
  {
    path: 'album/:id',
    loadComponent: () =>
      import('./screens/album-detail.component').then(
        (m) => m.AlbumDetailComponent
      ),
  },
];
