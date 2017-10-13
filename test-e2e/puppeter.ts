import * as puppeteer from "puppeteer";

export let puppeteerInstance: puppeteer.Browser;

before(async () => {
  const browser = await puppeteer.launch();

  puppeteerInstance = browser;
});

after(() => puppeteerInstance.close());
