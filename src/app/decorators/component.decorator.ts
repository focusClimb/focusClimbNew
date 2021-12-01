/* eslint-disable @typescript-eslint/no-explicit-any */

import { OnInit } from '@interfaces/component.interface';
import { ComponentArguments } from '@models/component-arguments.mode';
import { Subject } from '@reactive/subject';
import { SvgIconsService } from '@services/svg-icons.service';

function isOnInit(arg: any): arg is OnInit {
  return typeof arg?.fcOnInit === 'function';
}

type Constructor<T> = new (...args: any[]) => T;

export function Component(args: ComponentArguments) {
  const htmlElementSubject = new Subject<any>();
  const htmlElementClass = class extends HTMLElement {
    constructor() {
      super();

      (async () => {
        try {
          this.attachShadow({ mode: 'open' });
          this.className = `${args.selector} ${this.className}`;

          await this.attachStyle(args.style);
          await this.attachTemplate(args.template);
          await this.attachStyle('');
          this.loadIcons();

          htmlElementSubject.next({
            shadowRoot: this.shadowRoot,
            attributes: this.fetchAttributes()
          });
        } catch (error) {
          console.error(error);
        }
      })();
    }

    async attachTemplate(template: Promise<any> | string): Promise<void> {
      const rootElement = document.createElement('div');
      rootElement.innerHTML = template instanceof Promise ? (await template).default : template;
      this.shadowRoot?.appendChild(rootElement);
    }

    async attachStyle(style: Promise<any> | string): Promise<void> {
      if (style instanceof Promise) {
        (await style).default.use({ target: this.shadowRoot });
      } else {
        const styleElement = document.createElement('style');
        styleElement.textContent = style;
        this.shadowRoot?.appendChild(styleElement);
      }
    }

    fetchAttributes(): { [key: string]: string | number | unknown } {
      const attributes = {};

      for (const attribute of this.attributes) {
        attributes[attribute.nodeName] = attribute.nodeValue;
      }

      return attributes;
    }

    loadIcons(): void {
      SvgIconsService.instance.loadIcons(this.shadowRoot?.children[1]);
    }
  }

  return function <T extends Constructor<any>>(BaseClass: T) {
    return class extends BaseClass {
      constructor(..._args: any[]) {
        super(_args);

        const htmlELementSub = htmlElementSubject.subscribe(data => {
          BaseClass.prototype.shadowRoot = data.shadowRoot;

          for (const key of Object.keys(data.attributes)) {
            BaseClass.prototype[key] = data.attributes[key];
          }

          if (isOnInit(this)) {
            this.fcOnInit();
          }

          htmlElementSubject.unsubscribe(htmlELementSub);
        });

        customElements.define(args.selector, htmlElementClass);
      }
    }
  };
}
