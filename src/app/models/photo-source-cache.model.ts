import { PhotoSource } from './photo-source.model';

export interface PhotoSourceCache<T> {
  photoSource: PhotoSource;
  response:T;
  date: Date;
  state: { [key: string]: string | number | unknown };
}
