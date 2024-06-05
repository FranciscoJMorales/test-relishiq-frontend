import { Album } from "./album";

export interface Photo {
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
    album: Album;
}
