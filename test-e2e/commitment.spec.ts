import * as BigNumber from "bignumber.js";
import { expect } from "chai";

import { contractRepository } from "./contracts/Repository";
import { CommitPage } from "./pages/Commit.page";
import { puppeteerInstance } from "./puppeter";
import { waitUntilResolves } from "./utils";

describe("Commit page", () => {
  it("should be able to commit money", async () => {
    const investor = contractRepository.account;
    const startingDate = Date.now() / 1000; // start ico right away
    await contractRepository.commitmentModified.addWhitelistedTx(
      [investor],
      [new BigNumber.BigNumber(1)],
      [contractRepository.web3.toWei(20, "ether")],
      {
        gas: 2000000,
      }
    );
    await contractRepository.commitmentModified.setWhitelistingStartDateTx(startingDate, {
      gas: 2000000,
    });

    const commitPage = await CommitPage.create(puppeteerInstance);
    await commitPage.commitContainer.waitFor();
    await commitPage.acceptLegalAgreement();

    await commitPage.ethAmountInput.type("2");

    await waitUntilResolves(async () =>
      expect(await commitPage.estimatedReward.text()).to.be.eq("1938.9249 NEU")
    );
    await commitPage.commitBtn.click();

    await commitPage.transactionSummary.waitFor();
  });
});
