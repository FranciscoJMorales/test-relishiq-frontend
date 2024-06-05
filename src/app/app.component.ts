import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PhotosService } from './services/photos.service';
import { Photo } from './interfaces/photo';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  title: string = 'MetaPhoto';

  loading: boolean = true;

  filters: FormGroup;
  offset: number = 0;
  limit: number = 25;

  photos: Array<Photo> = [];

  constructor(
    private formBuilder: FormBuilder,
    private photosService: PhotosService,
  ) {
    this.filters = formBuilder.group({
      title: [null],
      albumTitle: [null],
      albumUserEmail: [null],
    });
  }

  ngOnInit(): void {
    this.getPhotos();
  }

  async getPhotos() {
    this.loading = true;
    try {
      const { title, albumTitle, albumUserEmail } = this.filters.value;
      this.photos = await this.photosService.getPhotos(title, albumTitle, albumUserEmail, this.offset, this.limit);
    }
    catch {
      this.photos = [];
    }
    this.loading = false;
  }
}
