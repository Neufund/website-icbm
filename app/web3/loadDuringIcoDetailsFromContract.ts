import config from "../config";
import {
  ethLock,
  ethToken,
  euroLock,
  euroToken,
  neumark,
  publicCommitment,
} from "./contracts/ContractsRepository";
import { asEtherNumber } from "./utils";

export async function loadDuringIcoDetailsFromContract() {
  const [totalSupply, issuanceRate, allFunds] = await Promise.all([
    neumark.totalSupply.then(asEtherNumber),
    publicCommitment.issuanceRate,
    allFundsCommitment().then(asEtherNumber),
    allInvestors,
  ]);

  return {
    totalSupply,
    issuanceRate,
    allFunds,
    allInvestors,
  };
}

export async function allFundsCommitment() {
  const ethCommitted = await ethToken.balanceOf(config.contractsDeployed.etherLockAddress);
  const eurCommitted = await euroToken.balanceOf(config.contractsDeployed.euroLockAddress);
  const ethEur = config.contractsDeployed.ethEurRate;
  return ethCommitted.plus(eurCommitted.div(ethEur));
}

export async function allInvestors() {
  const ethInvestors = await ethLock.totalInvestors;
  const euroInvestors = await euroLock.totalInvestors;

  return ethInvestors.add(euroInvestors);
}
