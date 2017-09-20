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
  return web3Instance.fromWei(bignum, "ether");
}

export function promisify(func: any, args: any): Promise<any> {
  return new Promise((res, rej) => {
    func(...args, (err: any, data: any) => {
      if (err) {
        return rej(err);
      }
      return res(data);
    });
  });
}
