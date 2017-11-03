import { Page } from "puppeteer";

export class Element {
  constructor(protected readonly page: Page, protected readonly selector: string) {}

  public async waitFor() {
    return this.page.waitFor(this.selector);
  }

  public async text() {
    return this.page.evaluate(
      (selector: string) => document.querySelector(selector).textContent,
      this.selector as any
    );
  }

  public async click() {
    return this.page.click(this.selector);
  }
}
