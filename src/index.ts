import { AppComponent } from '@app/app.component';
import { icons } from '@app/icons';
import { WallpaperComponent } from '@components/wallpaper/wallpaper.component';
import { SvgIconsService } from '@services/svg-icons.service';

(async () => {
  try {
    await SvgIconsService.instance.registerIcons(icons);

    const styles = (await import('./styles.scss')).default;
    styles.use({ target: document.getElementsByTagName('head')[0] });

    new WallpaperComponent();
    new AppComponent();
  } catch (error) {
    console.error(error);
  }
})();
