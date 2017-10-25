import { delay } from "bluebird";
import { readFileSync } from "fs";
import { Browser, Page } from "puppeteer";
import { tid } from "../../test/utils";
import { config } from "../config";
import { Element } from "./Element";

export class CommitPage {
  public static async create(puppeteer: Browser): Promise<CommitPage> {
    const page = await puppeteer.newPage();
    await page.goto(`${config.url}commit`);

    return new CommitPage(puppeteer, page);
  }

  private constructor(public readonly puppeteer: Browser, public readonly page: Page) {}

  public get commitContainer() {
    return new Element(this.page, tid("commit-container"));
  }

  public async acceptLegalAgreement(): Promise<any> {
    const selector = tid("legal-modal");
    await this.page.waitFor(selector);
    await delay(500); // give it some time to animation to finish @todo improve it
    await this.page.click(`input[name="reservationAgreement"]`);
    await this.page.click(`input[name="tokenHolderAgreement"]`);
    await this.page.click(tid("legal-modal-btn"));
  }
}
