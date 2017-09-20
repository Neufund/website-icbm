import { BigNumber } from "bignumber.js";
import * as moment from "moment";
import { web3Instance } from "./web3Provider";

export function asMomentDate(bignum: BigNumber) {
  const asInt = bignum.toNumber();

  return moment.utc(asInt, "X");
}

export function asNumber(bignum: BigNumber) {
  return bignum.toNumber();
}

export function asEtherNumber(bignum: BigNumber) {
  return web3Instance.fromWei(bignum, "ether").toNumber();
}
