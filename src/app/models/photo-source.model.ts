import { Photo } from './photo.model';

export interface PhotoSource<T> {
  name: string;
  label: string;
  url: string;
  headers: { [key: string]: string };
  params: { [key: string]: string | number | unknown };
  extractPhotos: (r: T) => Photo[];
}
