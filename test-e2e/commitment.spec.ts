import { delay } from "bluebird";
import { contractRepository } from "./contracts/Repository";
import { CommitPage } from "./pages/Commit.page";
import { puppeteerInstance } from "./puppeter";

describe("Commit page", () => {
  it.only("should be able to commit money", async () => {
    const startingDate = Date.now() / 1000; // start ico right away
    await contractRepository.commitmentModified.setWhitelistingStartDateTx(startingDate, {
      gas: 2000000,
    });

    const commitPage = await CommitPage.create(puppeteerInstance);
    await commitPage.commitContainer.waitFor();

    await commitPage.acceptLegalAgreement();

    await delay(1000000);
  });
});
