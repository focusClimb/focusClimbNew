let instance;
export class SvgIconsService {
  protected readonly icons = new Map<string, Promise<string>>();

  static get instance(): SvgIconsService {
    if (!instance) {
      instance = new SvgIconsService();
    }

    return instance;
  }

  async registerIcons(icons: Map<string, string>): Promise<void> {
    try {
      for (const [icon, url] of icons) {
        this.icons.set(icon, fetch(url).then(r => r.text()));
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
      for (const icon of this.icons.keys()) {
        const elements = dom.getElementsByClassName(`icon ${icon}`);
        const svg = await this.icons.get(icon);

        for (const element of elements) {
          element.innerHTML = svg || '';
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
}
