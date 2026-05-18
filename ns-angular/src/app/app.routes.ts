import { Routes } from '@angular/router';
import { HomeComponent } from './components/home.component';
import { AlbumDetailComponent } from './screens/album-detail.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'album/:id', component: AlbumDetailComponent },
];
