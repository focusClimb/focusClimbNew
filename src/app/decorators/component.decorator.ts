/* eslint-disable @typescript-eslint/no-explicit-any */

import { OnInit } from '@interfaces/component.interface';
import { SvgIcons } from '@app/icons/svg-icons';

function isOnInit(arg: any): arg is OnInit {
  return typeof arg?.fcOnInit === 'function';
}

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

        (async () => {
          try {
            this.attachShadow({ mode: 'open' });
            this.applyAttributesToClass();

            this.className = `${args.selector} ${this.className}`;

            await this.attachStyle(args.style);
            await this.attachTemplate(args.template);
            await this.attachStyle('');
            this.loadIcons();

            if (isOnInit(this)) {
              this.fcOnInit();
            }

          } catch (error) {
            console.error(error);
          }
        })();
      }

      async attachTemplate(template: Promise<any> | string): Promise<void> {
        const rootElement = document.createElement('div');
        rootElement.innerHTML = template instanceof Promise ? (await template).default : template;
        this.shadowRoot.appendChild(rootElement);
      }

      async attachStyle(style: Promise<any> | string): Promise<void> {
        if (style instanceof Promise) {
          (await style).default.use({ target: this.shadowRoot });
        } else {
          const styleElement = document.createElement('style');
          styleElement.textContent = style;
          this.shadowRoot.appendChild(styleElement);
        }
      }

      applyAttributesToClass(): void {
        for (const attribute of this.attributes) {
          this[attribute.nodeName] = attribute.nodeValue;
        }
      }

      loadIcons(): void {
        SvgIcons.instance.loadIcons(this.shadowRoot.children[1]);
      }
    }
  };
}
