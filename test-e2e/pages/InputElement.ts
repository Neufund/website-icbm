import { Page } from "puppeteer";
import { Element } from "./Element";

export class InputElement extends Element {
  constructor(page: Page, selector: string) {
    super(page, selector);
  }

  public async type(value: string) {
    await this.page.focus(this.selector);
    await this.page.type(value);
  }
}
