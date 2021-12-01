import { Component } from '@decorators/component.decorator';
import { OnInit } from '@interfaces/component.interface';
import { Photo } from '@models/photo.model';
import { PhotoService } from '@services/photo.service';


@Component({
  selector: 'fc-wallpaper',
  template: import('./wallpaper.component.html'),
  style: import('./wallpaper.component.scss')
})
export class WallpaperComponent<T> implements OnInit {
  search: string;
  shadowRoot: ShadowRoot;
  photographerElement: HTMLAnchorElement;
  photographerNameElement: HTMLSpanElement;
  styleElement: HTMLStyleElement;

  constructor(private photoService: PhotoService<T>) {

  }

  fcOnInit(): void {
    this.photographerElement = this.shadowRoot.getElementById('fcWallpaperPhotographer') as HTMLAnchorElement;
    this.photographerNameElement = this.photographerElement?.getElementsByClassName('fc-wallpaper-photographer-name')[0] as HTMLSpanElement;
    this.styleElement = this.shadowRoot.lastChild as HTMLStyleElement;

    this.photoService.photoSource.params.query = this.search;
    this.photoService.photoSource.params.page = 9;
    this.photoService.loadPhotos().then(data => {
      if (!data?.photos?.length) {
        this.photoService.clearCache();
        return;
      }

      const photo = data.photos[((max) => Math.floor(Math.random() * max))(data.photos.length)];
      this.updateBackground(photo);
    });
  }

  updateBackground(photo: Photo): void {
    this.styleElement.innerHTML = `
      .fc-wallpaper-photo {
        background-image: url(${photo.tinySize()});
      }

      .fc-wallpaper-photo::after {
        background-image: url(${photo.largeSize()});
        animation: fadeInAnimation 2s forwards ease-in;
      }

      .fc-wallpaper-photo .fc-wallpaper-photographer {
        animation: fadeInAnimation 2s forwards ease-in;
      }
    `;

    this.photographerElement.href = photo.photographerUrl();
    this.photographerNameElement.innerText = photo.photographer();
    this.photographerNameElement.title = `Photographer: ${photo.photographer()}`;
  }
}

