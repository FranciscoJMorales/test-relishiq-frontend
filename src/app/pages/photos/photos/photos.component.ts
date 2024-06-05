import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Photo } from '../../../interfaces/photo';
import { PhotosService } from '../../../services/photos.service';

@Component({
  selector: 'app-photos',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './photos.component.html',
  styleUrl: './photos.component.scss'
})
export class PhotosComponent implements OnInit {

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
