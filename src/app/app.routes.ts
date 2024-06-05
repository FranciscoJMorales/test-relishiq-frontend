import { Routes } from '@angular/router';
import { PhotosComponent } from './pages/photos/photos/photos.component';

export const routes: Routes = [
    {
        path: '',
        component: PhotosComponent,
    },
    {
        path: '**',
        redirectTo: '',
    }
];