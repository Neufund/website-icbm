import {
  etherLock,
  etherToken,
  euroLock,
  euroToken,
  neumark,
  publicCommitment,
} from "./contracts/ContractsRepository";
import { asEtherNumber } from "./utils";

export async function loadDuringIcoDetailsFromContract() {
  const [totalSupply, issuanceRate, allFunds, investors] = await Promise.all([
    neumark.totalSupply.then(asEtherNumber),
    publicCommitment.issuanceRate,
    allFundsCommitment().then(asEtherNumber),
    allInvestors(),
  ]);

  return {
    totalSupply,
    issuanceRate,
    allFunds,
    investors,
  };
}

export async function allFundsCommitment() {
  const ethCommitted = await etherToken.balanceOf(etherLock.address);
  const eurCommitted = await euroToken.balanceOf(euroLock.address);
  const ethEur = await publicCommitment.convertToEur(1); // @todo this and few other could be evaluated only once
  return ethCommitted.plus(eurCommitted.div(ethEur));
}

export async function allInvestors() {
  const ethInvestors = await etherLock.totalInvestors;
  const euroInvestors = await euroLock.totalInvestors;

  return ethInvestors.add(euroInvestors);
}
