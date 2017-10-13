import { Page } from "puppeteer";

export class Element {
  constructor(private readonly page: Page, private readonly selector: string) {}

  public async waitFor() {
    return this.page.waitFor(this.selector);
  }

  public async text() {
    return this.page.evaluate(() => document.querySelector(this.selector).textContent);
  }
}
