import { UrlHelper } from '@helpers/url.helper';
import { PhotoSourceCache } from '@models/photo-source-cache.model';
import { PhotoSource } from '@models/photo-source.model';



export class PhotoService<T> {
  readonly CACHE_KEY = 'fc_pexels_service';
  readonly CACHE_TIME_DURATION = 30; // Minutes

  writeToCache(data: PhotoSourceCache<T>): void {
    localStorage.setItem(this.CACHE_KEY, JSON.stringify(data));
  }

  readFromCache(): PhotoSourceCache<T> {
    const data = localStorage.getItem(this.CACHE_KEY);
    return data ? JSON.parse(data) : null;
  }

  clearCache(): void {
    localStorage.removeItem(this.CACHE_KEY);
  }

  async updateState(photoSource: PhotoSource, response: Promise<T>): Promise<void> {
    this.writeToCache({
      photoSource,
      response: await response,
      date: new Date(),
      state: {}
    });
  }

  async loadPhotos(photoSource: PhotoSource): Promise<T> {
    const cachedData = this.readFromCache();

    if (cachedData?.photoSource.params.query === photoSource.params.query
      && cachedData?.photoSource.params.page === photoSource.params.page
      && cachedData?.response) {
      const lastUpdateDate = new Date(cachedData.date);
      const now = new Date();
      const lastUpdateDuration = (now.getTime() - lastUpdateDate.getTime()) / 1000 / 60;

      if (lastUpdateDuration <= this.CACHE_TIME_DURATION) {
        return cachedData.response;
      }
    }

    const response = this.sendRequest(photoSource);
    this.updateState(photoSource, response);

    return response;
  }

  async sendRequest(photoSource: PhotoSource): Promise<T> {
    const queryString = UrlHelper.convertToQueryString(photoSource.params);
    const request = new Request(`${photoSource.url}?${queryString}`);
    const headers = new Headers();

    for (const header of Object.keys(photoSource.headers)) {
      headers.append(header, photoSource.headers[header]);
    }

    const init = {
      method: 'GET',
      headers: headers,
      mode: 'cors',
      cache: 'no-store'
    } as RequestInit;

    return (await fetch(request, init)).json();
  }
}
