import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Photo } from '../../../interfaces/photo';
import { PhotosService } from '../../../services/photos.service';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-photos',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
  ],
  templateUrl: './photos.component.html',
  styleUrl: './photos.component.scss'
})
export class PhotosComponent implements OnInit {

  loading: boolean = true;

  filters: FormGroup;

  title: string | null = null;
  albumTitle: string | null = null;
  albumUserEmail: string | null = null;
  offset: number = 0;
  limit: number = 25;

  limits: Array<number> = [5, 10, 25, 50, 100];

  photos: Array<Photo> = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute, 
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
    // Get values from query string
    this.title = this.activatedRoute.snapshot.queryParams['title'] ?? null;
    this.albumTitle = this.activatedRoute.snapshot.queryParams['album.title'] ?? null;
    this.albumUserEmail = this.activatedRoute.snapshot.queryParams['album.user.email'] ?? null;
    const offset = parseInt(this.activatedRoute.snapshot.queryParams['offset'] ?? 0);
    const limit = parseInt(this.activatedRoute.snapshot.queryParams['limit'] ?? 25);

    // Validate offset and page limit
    this.offset = isNaN(offset) ? 0 : offset;
    this.limit = isNaN(limit) ? 25 : limit;
    if (!this.limits.includes(this.limit)) this.limit = 25;
    this.offset -= this.offset % this.limit;

    this.filters.reset({
      title: this.title,
      albumTitle: this.albumTitle,
      albumUserEmail: this.albumUserEmail,
    });

    this.getPhotos();
  }

  async getPhotos(): Promise<void> {
    this.loading = true;
    try {
      this.router.navigate(
        [], 
        {
          relativeTo: this.activatedRoute,
          queryParams: {
            title: this.title,
            "album.title": this.albumTitle,
            "album.user.email": this.albumUserEmail,
            offset: this.offset !== 0 ? this.offset : null,
            limit: this.limit !== 25 ? this.limit : null,
          },
        }
      );

      this.photos = await this.photosService.getPhotos(this.title, this.albumTitle, this.albumUserEmail, this.offset, this.limit);
    }
    catch {
      this.photos = [];
    }
    this.loading = false;
  }

  applyFilters(): void {
    const { title, albumTitle, albumUserEmail } = this.filters.value;
    this.title = title;
    this.albumTitle = albumTitle;
    this.albumUserEmail = albumUserEmail;
    this.offset = 0;
    this.getPhotos();
  }

  clearFilters(): void {
    this.filters.reset();
    this.title = null;
    this.albumTitle = null;
    this.albumUserEmail = null;
    this.offset = 0;
    this.getPhotos();
  }

  previousPage(): void {
    this.offset -= this.limit;
    this.getPhotos();
  }

  nextPage(): void {
    this.offset += this.limit;
    this.getPhotos();
  }

  changeLimit(limit: number): void {
    this.offset = 0;
    this.limit = limit;
    this.getPhotos();
  }
}
