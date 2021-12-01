import { Photo } from './photo.model';

export interface PhotoResponse<T> {
  originalResponse: T;
  photos: Photo[];
}
