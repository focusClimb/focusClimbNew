import { AppComponent } from '@app/app.component';
import { WallpaperComponent } from '@components/wallpaper/wallpaper.component';
import { SvgIcons } from '@app/icons/svg-icons';

SvgIcons.instance.registerIcons([
  'icon-camera'
]);

import('./styles.scss').then(r => r.default.use({ target: document.getElementsByTagName('head')[0] }));

new AppComponent();
new WallpaperComponent();


