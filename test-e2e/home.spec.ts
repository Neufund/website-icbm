import { config } from "./config";
import { contractRepository } from "./contracts/Repository";
import { HomePage } from "./pages/Home.page";
import { puppeteerInstance } from "./puppeter";

describe("Home page", () => {
  it("should display page before ico", async () => {
    const startingDate = Date.now() / 1000 + 60 * 50;
    console.log("startingDate: ", startingDate);
    await contractRepository.commitmentModified.setWhitelistingStartDateTx(startingDate, {
      gas: 2000000,
    });

    // const homepage = await HomePage.create(puppeteerInstance);

    // await homepage.duringIcoDetails.waitFor();

    // await homepage.totalFundsCommited.text();

    // const homepage = await puppeteerInstance.newPage();
    // await homepage.goto("http://localhost:8080");
    // console.log("waiting for countdown");
    // await homepage.waitFor(".DuringIcoCountdown__title___25SYI");
    // const text = await homepage.evaluate(
    //   () => document.querySelector(".DuringIcoCountdown__extra-size___jecte").textContent
    // );

    // console.log("TEXT: ", text);
  });
});

// 1507824138920
// 1507824157
