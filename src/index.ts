import { AppComponent } from '@app/app.component';
import('./styles.scss').then(r => r.default.use({ target: document.getElementsByTagName('head')[0] }));

new AppComponent();
