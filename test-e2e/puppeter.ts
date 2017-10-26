import * as Bluebird from "bluebird";
import * as puppeteer from "puppeteer";
import { config } from "./config";

// this helps us to get nicer stack traces
global.Promise = Bluebird;

export let puppeteerInstance: puppeteer.Browser;

before(async () => {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    ignoreHTTPSErrors: true,
    headless: !config.puppeteerDebug,
  });

  puppeteerInstance = browser;
});

after(() => puppeteerInstance.close());
