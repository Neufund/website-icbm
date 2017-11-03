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

export async function loadDuringIcoDetailsFromContract(
  ethEurFraction: string,
  ethDecimals: number
) {
  return await promiseAll({
    totalSupply: neumark.totalSupply.then(bn => bn.toString()),
    issuanceRate: issuanceRate(ethDecimals).then(bn => bn.toString()),
    allFunds: allFundsCommitment(new BigNumber(ethEurFraction)).then(bn => bn.toString()),
    investors: allInvestors(),
  });
}

export async function allFundsCommitment(ethEurFraction: BigNumber): Promise<BigNumber> {
  const ethCommitted = await etherToken.balanceOf(etherLock.address);
  const eurCommitted = await euroToken.balanceOf(euroLock.address);
  return ethCommitted.plus(eurCommitted.div(ethEurFraction));
}

export async function allInvestors() {
  const ethInvestors = await etherLock.totalInvestors;
  const euroInvestors = await euroLock.totalInvestors;

  return ethInvestors.add(euroInvestors);
}

export async function issuanceRate(ethDecimals: number): Promise<BigNumber> {
  const eth = new BigNumber(10).pow(ethDecimals);
  return await publicCommitment.estimateNeumarkReward(eth.toString());
}
