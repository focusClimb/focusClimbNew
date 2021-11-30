let instance;
export class SvgIcons {
  protected readonly icons: Set<string> = new Set();
  protected readonly cache = new Map();

  static get instance(): SvgIcons {
    if (!instance) {
      instance = new SvgIcons();
    }

    return instance;
  }

  registerIcons(icons: string[]): void {
    for (const icon of icons) {
      this.icons.add(icon);

      if (!this.cache.has(icon)) {
        this.cache.set(icon, { url: import(`./svg/${icon}.svg`) });
      }
    }
  }

  async loadIcons(dom?: Element): Promise<void> {
    if (!dom) {
      return;
    }

    for (const icon of this.icons) {
      const elements = dom.getElementsByClassName(icon);

      if (!elements.length) {
        continue;
      }

      if (!this.cache.get(icon).svg) {
        const iconUrl = (await this.cache.get(icon).url).default;

        this.cache.set(icon, {
          ...this.cache.get(icon),
          svg: fetch(iconUrl).then(r => r.text())
        });
      }

      const svg = await this.cache.get(icon).svg;

      this.cache.set(icon, {
        ...this.cache.get(icon),
        svg: Promise.resolve(svg)
      });

      for (const element of elements) {
        element.innerHTML = svg;
      }
    }
  }
}
