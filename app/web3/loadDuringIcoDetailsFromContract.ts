import { BigNumber } from "bignumber.js";
import promiseAll = require("promise-all");

import {
  etherLock,
  etherToken,
  euroLock,
  euroToken,
  neumark,
  publicCommitment,
} from "./contracts/ContractsRepository";

export async function loadDuringIcoDetailsFromContract() {
  return await promiseAll({
    totalSupply: neumark.totalSupply.then(bn => bn.toString()),
    issuanceRate: issuanceRate().then(bn => bn.toString()),
    allFunds: allFundsCommitment().then(bn => bn.toString()),
    investors: allInvestors(),
  });
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

export async function issuanceRate(): Promise<BigNumber> {
  const ethDecimals = await etherToken.decimals;
  const eth = new BigNumber(10).pow(ethDecimals.toNumber());
  return await publicCommitment.estimateNeumarkReward(eth.toString());
}
