import { delay } from "bluebird";
import { readFileSync } from "fs";
import { Browser, Page } from "puppeteer";
import { tid } from "../../test/utils";
import { config } from "../config";
import { Element } from "./Element";
import { InputElement } from "./InputElement";

const web3Raw = readFileSync("node_modules/web3/dist/web3.min.js").toString();

export class CommitPage {
  public static async create(puppeteer: Browser): Promise<CommitPage> {
    const page = await puppeteer.newPage();
    await page.goto(`${config.url}commit`);
    await page.evaluate(
      (web3Raw: string, httpProvider: string) => {
        eval(web3Raw);
        // this is super ugly thanks to TS not knowing real context of this function
        // hopefully tsc 2.7 will add a way to easily ignore errors in code
        (window as any).web3 = new (window as any).Web3(
          new (window as any).Web3.providers.HttpProvider(httpProvider)
        );
      },
      web3Raw as any,
      config.injectedRpcProvider as any
    );

    return new CommitPage(puppeteer, page);
  }

  private constructor(public readonly puppeteer: Browser, public readonly page: Page) {}

  public get commitContainer() {
    return new Element(this.page, tid("commit-container"));
  }

  public get walletInBrowser() {
    return new Element(this.page, tid("wallet-selector-browser"));
  }

  public async acceptLegalAgreement(): Promise<any> {
    const selector = tid("legal-modal");
    await this.page.waitFor(selector);
    await delay(500); // give it some time to animation to finish @todo improve it
    await this.page.click(`input[name="reservationAgreement"]`);
    await this.page.click(`input[name="tokenHolderAgreement"]`);
    await this.page.click(tid("legal-modal-btn"));
    await delay(500); // give it some time to animation to finish @todo improve it
  }

  public get ethAmountInput() {
    return new InputElement(this.page, `input[name="ethAmount"]`);
  }

  public get estimatedReward() {
    return new Element(this.page, tid("estimated-reward-value"));
  }

  public get commitBtn() {
    return new Element(this.page, tid("commit-btn"));
  }

  public get transactionSummary() {
    return new Element(this.page, tid("transaction-summary"));
  }
}
