import * as moment from "moment";
import web3 from "./web3Provider";

export function asMomentDate(bignum: any) {
  const asInt = bignum.toNumber();

  return moment.utc(asInt, "X");
}

export function asNumber(bignum: any) {
  return bignum.toNumber();
}

export function asEtherNumber(bignum: any) {
  return web3.fromWei(bignum, "ether").toNumber();
}
