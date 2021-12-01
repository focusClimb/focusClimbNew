import { AppComponent } from '@app/app.component';
import { icons } from '@app/icons';
import { WallpaperComponent } from '@components/wallpaper/wallpaper.component';
import { PexelsResponse } from '@models/pexels-response.model';
import { PhotoSource } from '@models/photo-source.model';
import { Photo } from '@models/photo.model';
import { PhotoService } from '@services/photo.service';
import { SvgIconsService } from '@services/svg-icons.service';

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
  },
  extractPhotos: (response) => {
    const photos: Photo[] = [];

    for (const photo of response.photos) {
      photos.push({
        tinySize: () => `${photo.src.original}?auto=compress&cs=tinysrgb&&fit=crop&h=54&w=96`,
        largeSize: () => `${photo.src.original}?fit=crop&h=1080&w=1920`,
        photographer: () => photo.photographer,
        photographerUrl: () => photo.photographer_url,
      });
    }

    return photos;
  }
} as PhotoSource<PexelsResponse>;

(async () => {
  try {
    await SvgIconsService.instance.registerIcons(icons);

    const styles = (await import('./styles.scss')).default;
    styles.use({ target: document.getElementsByTagName('head')[0] });

    new WallpaperComponent<PexelsResponse>(PEXELS, new PhotoService<PexelsResponse>());
    new AppComponent();
  } catch (error) {
    console.error(error);
  }
})();
