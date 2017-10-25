import { Page } from "puppeteer";

export class Element {
  constructor(private readonly page: Page, private readonly selector: string) {}

  public async waitFor() {
    return this.page.waitFor(this.selector);
  }

  public async text() {
    return this.page.evaluate(
      (selector: string) => document.querySelector(selector).textContent,
      this.selector as any // @todo fix typings
    );
  }

  public async click() {
    return this.page.click(this.selector);
  }
}
