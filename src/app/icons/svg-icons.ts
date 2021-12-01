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

  async registerIcons(icons: string[]): Promise<void> {
    try {
      for (const icon of icons) {
        this.icons.add(icon);

        const iconUrl = (await import(`./svg/${icon}.svg`)).default;
        this.cache.set(icon, fetch(iconUrl).then(r => r.text()));
      }
    } catch (error) {
      console.error(error);
    }
  }

  async loadIcons(dom?: Element): Promise<void> {
    if (!dom) {
      return;
    }

    try {
      for (const icon of this.icons) {
        const elements = dom.getElementsByClassName(icon);
        const svg = await this.cache.get(icon);

        for (const element of elements) {
          element.innerHTML = svg;
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
}
