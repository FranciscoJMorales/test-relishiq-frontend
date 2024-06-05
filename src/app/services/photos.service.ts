import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from './../../environments/environment';
import { Photo } from '../interfaces/photo';

@Injectable({
    providedIn: 'root'
})

export class PhotosService {

    private Url: string;

    constructor(private http: HttpClient) {
        this.Url = `${environment.baseUrl}/photos`
    }

    async getPhotos(): Promise<Array<Photo>> {
        return await lastValueFrom(this.http.get<Array<Photo>>(this.Url));
    }

    async getPhoto(id: number): Promise<Photo> {
        return await lastValueFrom(this.http.get<Photo>(`${this.Url}/${id}`));
    }
}
