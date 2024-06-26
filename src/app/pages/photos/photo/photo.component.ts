import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Photo } from '../../../interfaces/photo';
import { PhotosService } from '../../../services/photos.service';
import { Address } from '../../../interfaces/address';
import { Company } from '../../../interfaces/company';

@Component({
  selector: 'app-photo',
  standalone: true,
  imports: [],
  templateUrl: './photo.component.html',
  styleUrl: './photo.component.scss'
})
export class PhotoComponent implements OnInit{

  loading: boolean = true;
  error: boolean = false;

  id: number = 0;
  photo: Photo | null = null;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute, 
    private photosService: PhotosService,
  ) {
    this.error = false;
  }

  ngOnInit(): void {
    // Get id from param
    this.id = parseInt(this.activatedRoute.snapshot.params['id']);
    if (isNaN(this.id))
      this.router.navigate(['/']);
    this.getPhoto();
  }

  async getPhoto(): Promise<void> {
    this.error = false;
    this.loading = true;
    try {
      this.photo = await this.photosService.getPhoto(this.id);
    }
    catch {
      this.photo = null;      
      this.error = true;
    }
    this.loading = false;
  }

  formatAddress(address: Address): string {
    return `${address.street} ${address.suite}, ${address.city} ${address.zipcode} (${address.geo.lat}, ${address.geo.lng})`;
  }

  formatCompany(company: Company): string {
    return `${company.name}: ${company.catchPhrase} (${company.bs})`;
  }
}
