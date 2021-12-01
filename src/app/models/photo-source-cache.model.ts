import { PhotoSource } from './photo-source.model';

export interface PhotoSourceCache<T> {
  photoSource: PhotoSource<T>;
  response:T;
  date: Date;
  state: { [key: string]: string | number | unknown };
}
