import { Browser, Page } from "puppeteer";
import { config } from "../config";
import { Element } from "./Element";

export class HomePage {
  public static async create(puppeteer: Browser): Promise<HomePage> {
    const page = await puppeteer.newPage();
    await page.goto(config.url);

    return new HomePage(puppeteer, page);
  }

  private constructor(private readonly puppeteer: Browser, private readonly page: Page) {}

  public get duringIcoDetails() {
    return new Element(this.page, ".details");
  }

  public get totalFundsCommited() {
    return new Element(this.page, ".totalfunds");
  }
}
