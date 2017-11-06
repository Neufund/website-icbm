import { BigNumber } from "bignumber.js";
import promiseAll = require("promise-all");

import { etherLock, euroLock, neumark, publicCommitment } from "./contracts/ContractsRepository";
import { convertEurToEth } from "./utils";

export async function loadDuringIcoDetailsFromContract(
  ethEurFraction: string,
  ethDecimals: number
) {
  const ethEurFractionBN = new BigNumber(ethEurFraction);
  return await promiseAll({
    totalNeumarkSupply: neumark.totalSupply,
    reservedNeumarks: neumark.balanceOf(publicCommitment.address),
    issuanceRate: issuanceRate(ethDecimals),
    ethCommitted: etherLock.totalLockedAmount,
    eurCommitted: euroLock.totalLockedAmount.then(total =>
      convertEurToEth(ethEurFractionBN, total)
    ),
    totalCurveWei: neumark.totalEuroUlps.then(euro => convertEurToEth(ethEurFractionBN, euro)),
    investors: allInvestors(),
    platformOperatorNeumarkRewardShare: publicCommitment.platformOperatorNeumarkRewardShare,
  });
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
