import { expect } from "chai";

import { contractRepository } from "./contracts/Repository";
import { HomePage } from "./pages/Home.page";
import { puppeteerInstance } from "./puppeter";

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
  });
});
