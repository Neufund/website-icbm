import { readFileSync } from "fs";
import { Browser, Page } from "puppeteer";
import { tid } from "../../test/utils";
import { config } from "../config";
import { Element } from "./Element";

const lolexRaw = readFileSync("./node_modules/lolex/lolex.js").toString();

interface ILolexOptions {
  mockTime: boolean;
  now?: number;
}

export class HomePage {
  public static async create(puppeteer: Browser, lolexOptions?: ILolexOptions): Promise<HomePage> {
    const page = await puppeteer.newPage();
    await page.goto(config.url);
    if (lolexOptions && lolexOptions.mockTime) {
      await page.evaluate(
        (lolexSource: any, options: ILolexOptions) => {
          eval(lolexSource);
          (window as any).lolex.install(options);
        },
        lolexRaw as any,
        lolexOptions
      );
    }

    return new HomePage(puppeteer, page);
  }

  private constructor(public readonly puppeteer: Browser, public readonly page: Page) {}

  public get beforeIcoDetails() {
    return new Element(this.page, tid("before-ico-phase"));
  }

  public get duringIcoDetails() {
    return new Element(this.page, tid("during-ico-phase"));
  }

  public get countdownDays() {
    return new Element(this.page, tid("countdown-days"));
  }

  public get countdownHours() {
    return new Element(this.page, tid("countdown-hours"));
  }

  public get countdownMinutes() {
    return new Element(this.page, tid("countdown-minutes"));
  }

  public get countdownSeconds() {
    return new Element(this.page, tid("countdown-seconds"));
  }

  public get duringIcoCommitBtn() {
    return new Element(this.page, tid("during-ico-commit-btn"));
  }

  public get duringIco() {
    const page = this.page;
    return {
      get totalFundsCommitted() {
        return new Element(page, tid("during-ico-total-funds"));
      },

      get accountsCreated() {
        return new Element(page, tid("during-ico-accounts-created"));
      },

      get neumarksGenerated() {
        return new Element(page, tid("during-ico-neumarks-generated"));
      },

      get currentReward() {
        return new Element(page, tid("during-ico-current-reward"));
      },
    };
  }
}
