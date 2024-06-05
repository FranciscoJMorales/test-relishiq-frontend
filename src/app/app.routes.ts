import { Routes } from '@angular/router';
import { PhotosComponent } from './pages/photos/photos/photos.component';
import { PhotoComponent } from './pages/photos/photo/photo.component';

export const routes: Routes = [
    {
        path: '',
        component: PhotosComponent,
    },
    {
        path: ':id',
        component: PhotoComponent,
    },
    {
        path: '**',
        redirectTo: '',
    }
];