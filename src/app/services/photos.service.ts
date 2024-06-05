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

    async getPhotos(
        title: string | null,
        albumTitle: string | null,
        albumUserEmail: string | null,
        offset: number | null,
        limit: number | null,
    ): Promise<Array<Photo>> {
        let params = new HttpParams();
        if (title) params = params.append('title', title);
        if (albumTitle) params = params.append('album.title', albumTitle);
        if (albumUserEmail) params = params.append('album.user.email', albumUserEmail);
        if (offset) params = params.append('offset', offset);
        if (limit) params = params.append('limit', limit);
        return await lastValueFrom(this.http.get<Array<Photo>>(this.Url, { params }));
    }

    async getPhoto(id: number): Promise<Photo> {
        return await lastValueFrom(this.http.get<Photo>(`${this.Url}/${id}`));
    }
}
