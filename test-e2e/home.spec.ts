import { expect } from "chai";

import { config } from "./config";
import { contractRepository } from "./contracts/Repository";
import { HomePage } from "./pages/Home.page";
import { puppeteerInstance } from "./puppeter";
import { waitUntilResolves } from "./utils";

describe("Home page", () => {
  it("should display page before ico", async () => {
    const startingDate = 60 * 50; // start in a 50 minutes

    await contractRepository.commitmentModified.setWhitelistingStartDateTx(startingDate, {
      gas: 2000000,
    });

    const homepage = await HomePage.create(puppeteerInstance, { mockTime: true, now: 0 });

    await homepage.beforeIcoDetails.waitFor();

    expect(await homepage.countdownDays.text()).to.be.eq("00");
    expect(await homepage.countdownHours.text()).to.be.eq("00");
    expect(await homepage.countdownMinutes.text()).to.be.eq("50");
    expect(await homepage.countdownSeconds.text()).to.be.eq("00");
  });

  it("should display page during ico", async () => {
    const startingDate = Date.now() / 1000; // start ico right away

    await contractRepository.commitmentModified.setWhitelistingStartDateTx(startingDate, {
      gas: 2000000,
    });

    const homepage = await HomePage.create(puppeteerInstance);

    await homepage.duringIcoDetails.waitFor();
    await homepage.duringIco.totalFundsCommitted.waitFor();

    expect(await homepage.duringIco.totalFundsCommitted.text()).to.be.eq("1.0000 ETH");
    expect(await homepage.duringIco.accountsCreated.text()).to.be.eq("1");
    expect(await homepage.duringIco.neumarksGenerated.text()).to.be.eq("38999.4930 NEU");
    expect(await homepage.duringIco.currentReward.text()).to.be.eq("974.9994 NEU /  1 ETH");
  });

  it("should navigate to commitment page", async () => {
    const startingDate = Date.now() / 1000; // start ico right away

    await contractRepository.commitmentModified.setWhitelistingStartDateTx(startingDate, {
      gas: 2000000,
    });

    const homepage = await HomePage.create(puppeteerInstance);

    await homepage.duringIcoDetails.waitFor();
    await homepage.duringIcoCommitBtn.click();

    await waitUntilResolves(async () => {
      const url = await homepage.page.url();
      expect(url).to.be.eq(`${config.url}commit`);
    });
  });
});
