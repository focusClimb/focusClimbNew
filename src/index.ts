import { AppComponent } from '@app/app.component';
import { icons } from '@app/icons';
import { pexelsPhotoSource } from '@app/photo-sources/pexels';
import { WallpaperComponent } from '@components/wallpaper/wallpaper.component';
import { PexelsResponse } from '@models/pexels-response.model';
import { PhotoService } from '@services/photo.service';
import { SvgIconsService } from '@services/svg-icons.service';


(async () => {
  try {
    await SvgIconsService.instance.registerIcons(icons);

    const styles = (await import('./styles.scss')).default;
    styles.use({ target: document.getElementsByTagName('head')[0] });

    new WallpaperComponent<PexelsResponse>(new PhotoService<PexelsResponse>(pexelsPhotoSource));
    new AppComponent();
  } catch (error) {
    console.error(error);
  }
})();
