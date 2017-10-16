import * as Bluebird from "bluebird";
import * as puppeteer from "puppeteer";

global.Promise = Bluebird;

export let puppeteerInstance: puppeteer.Browser;

before(async () => {
  const browser = await puppeteer.launch({ args: ["--no-sandbox", "--disable-setuid-sandbox"] });

  puppeteerInstance = browser;
});

after(() => puppeteerInstance.close());
