/* eslint-disable @typescript-eslint/no-explicit-any */

import { SvgIcons } from '@app/icons/svg-icons';

export interface ComponentArguments {
  selector: string;
  template?: Promise<any> | any;
  style?: Promise<any> | any;
}

type Constructor<T> = new (...args: any[]) => T;

export function Component(args: ComponentArguments) {

  return function <T extends Constructor<any>>(BaseClass: T) {
    return class extends BaseClass {
      static readonly selector: string = args.selector;

      constructor(..._args: any[]) {
        super();
        this.attachShadow({ mode: 'open' });
        this.className = args.selector;

        let templatePromise: Promise<any>;

        if (args.template instanceof Promise) {
          templatePromise = args.template;
        } else {
          templatePromise = Promise.resolve(args.template)
        }

        templatePromise.then(r => {
          this.shadowRoot.innerHTML = r.default;

          for (const child of this.shadowRoot.children) {
            SvgIcons.instance.loadIcons(child);
          }

          this.attachStyle(args.style);
        });
      }

      attachStyle(style: Promise<any> | string): void {
        if (style instanceof Promise) {
          style?.then(r => r.default.use({ target: this.shadowRoot }));
        } else {
          const styleElement = document.createElement('style');
          styleElement.textContent = style;
          this.shadowRoot.appendChild(styleElement);
        }
      }
    }
  };
}
