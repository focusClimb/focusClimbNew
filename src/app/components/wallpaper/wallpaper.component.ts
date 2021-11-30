import { Component } from '@decorators/component.decorator';
import { OnInit } from '@interfaces/component.interface';
import { PexelsResponse } from '@models/pexels-response.model';
import { PhotoSource } from '@models/photo-source.model';
import { PhotoService } from '@services/photo.service';

const PEXELS = {
  name: 'PEXELS',
  label: 'Pexels.com',
  url: 'https://api.pexels.com/v1/search',
  headers: {
    'Authorization': '563492ad6f917000010000010b883213d49b45daaa804a8854ad452c'
  },
  params: {
    query: 'nature',
    per_page: 100,
    page: 0
  }
} as PhotoSource;


@Component({
  selector: 'fc-wallpaper',
  template: import('./wallpaper.component.html'),
  style: import('./wallpaper.component.scss')
})
export class WallpaperComponent implements OnInit {
  search: string;
  shadowRoot: ShadowRoot;
  photoService = new PhotoService<PexelsResponse>()

  fcOnInit(): void {
    PEXELS.params.query = this.search;
    PEXELS.params.page = 9;
    this.photoService.loadPhotos(PEXELS).then(data => this.updateBackground(data));
  }

  updateBackground(data: PexelsResponse): void {
    if (!this.shadowRoot || !data?.photos?.length) {
      this.photoService.clearCache();
      return;
    }

    const photo = data.photos[((max) => Math.floor(Math.random() * max))(data.photos.length)];

    const photographerElement = this.shadowRoot.getElementById('fcWallpaperPhotographer') as HTMLAnchorElement;
    const photographerNameElement = photographerElement?.getElementsByClassName('fc-wallpaper-photographer-name')[0] as HTMLSpanElement;
    const styleElement = this.shadowRoot.lastChild as HTMLStyleElement;

    if (styleElement) {
      styleElement.innerHTML = `
        .fc-wallpaper-photo {
          background-image: url(${photo.src.original}?auto=compress&cs=tinysrgb&&fit=crop&h=54&w=96);
        }

        .fc-wallpaper-photo::after {
          background-image: url(${photo.src.original}?fit=crop&h=1080&w=1920);
          animation: fadeInAnimation 2s forwards ease-in;
        }

        .fc-wallpaper-photo .fc-wallpaper-photographer {
          animation: fadeInAnimation 2s forwards ease-in;
        }
      `;
    }

    if (photographerElement) {
      photographerElement.href = photo.photographer_url;
      photographerNameElement.innerText = photo.photographer;
      photographerNameElement.title = `Photographer: ${photo.photographer}`;
    }
  }
}

