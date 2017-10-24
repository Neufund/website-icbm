import { BigNumber } from "bignumber.js";
import * as moment from "moment";
import * as replaceString from "replace-string";
import { IDictionary } from "../types";
import { Q18 } from "../web3/utils";

// bignumber.toString() can return something like 1.5e+27
export function bignumberToString(bignumberString: string) {
  const parts = bignumberString.split("e+");
  // no scientific notation, just return it
  if (parts.length === 1) {
    return bignumberString;
  }
  const first = parts[0].replace(".", "");
  const zeroes = parseInt(parts[1], 10) - (first.length - 1);

  return first + "0".repeat(zeroes);
}

export function formatMoney(decimals: number, moneyInULP: BigNumber) {
  const moneyInPrimaryBase = moneyInULP.div(new BigNumber(10).pow(decimals));
  return moneyInPrimaryBase.toFixed(4);
}

export function formatDate(dateAsBigNumber: BigNumber) {
  // we can't use here instanceof because it can be created by different constructor
  if (dateAsBigNumber.constructor.name !== "BigNumber") {
    throw new Error("Date has to be bignumber instance!");
  }

  const date = moment.utc(dateAsBigNumber.toNumber(), "X");
  return formatMomentDate(date);
}

export function formatMomentDate(date: moment.Moment) {
  if (!(date instanceof moment)) {
    throw new Error("Date has to be momentjs instance!");
  }

  return date.format("YYYY-MM-DD hh:mm UTC");
}

// expects fraction in ulps
export function formatFraction(fraction: BigNumber) {
  return bignumberToString(fraction.div(Q18).mul(100).toFixed(4));
}

export function calculateAndFormatRatio(amount: string, neumarkBalance: string): string {
  return new BigNumber(amount).div(new BigNumber(neumarkBalance)).toFixed(3);
}

// returns wei
export function calculateAndFormatFee(penaltyFraction: string, amount: string): string {
  return new BigNumber(penaltyFraction)
    .mul(new BigNumber(amount).mul(new BigNumber(10).pow(18)))
    .div(new BigNumber(10).pow(18))
    .toString();
}

export function replaceTags(text: string, tags: IDictionary): string {
  let outputText = text;
  Object.keys(tags).forEach(tag => {
    outputText = replaceString(outputText, `{${tag}}`, tags[tag]);
  });

  return outputText;
}
