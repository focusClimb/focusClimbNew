import { AppComponent } from '@app/app.component';
import { WallpaperComponent } from '@components/wallpaper/wallpaper.component';
import iconList from '@icons/icon-list';
import { SvgIcons } from '@icons/svg-icons';

(async () => {
  try {
    await SvgIcons.instance.registerIcons(iconList);

    const styles = (await import('./styles.scss')).default;
    styles.use({ target: document.getElementsByTagName('head')[0] });

    new WallpaperComponent();
    new AppComponent();
  } catch (error) {
    console.error(error);
  }
})();
