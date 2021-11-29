import { Component } from '@decorators/component.decorator';

@Component({
  selector: 'fc-app',
  template: import('./app.component.html'),
  style: import('./app.component.scss')
})
export class AppComponent {
}

