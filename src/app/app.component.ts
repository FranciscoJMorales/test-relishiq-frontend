import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PhotosService } from './services/photos.service';
import { Photo } from './interfaces/photo';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  title: string = 'MetaPhoto';

  loading: boolean = true;

  photos: Array<Photo> = [];

  constructor(private photosService: PhotosService) { }

  ngOnInit(): void {
    this.getPhotos();
  }

  async getPhotos() {
    this.loading = true;
    try {
      this.photos = await this.photosService.getPhotos();
    }
    catch {
      this.photos = [];
    }
    this.loading = false;
  }
}
