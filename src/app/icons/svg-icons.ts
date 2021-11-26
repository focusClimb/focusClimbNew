let instance;

export class SvgIcons {
  protected readonly icons: Set<string> = new Set();

  static get instance(): SvgIcons {
    if (!instance) {
      instance = new SvgIcons();
    }

    return instance;
  }

  registerIcons(icons: string[]): void {
    for (const icon of icons) {
      this.icons.add(icon);
    }
  }

  loadIcons(dom?: HTMLElement): void {
    for (const icon of this.icons) {
      import(`./svg/${icon}.svg`)
        .then(r => r.default)
        .then(iconUrl => {
          fetch(iconUrl)
            .then(r => r.text())
            .then(svg => {
              const elements = (dom || document).getElementsByClassName(icon);

              for (const element of elements) {
                element.innerHTML = svg;
              }
            });
        });
    }
  }
}
