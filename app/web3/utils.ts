import { BigNumber } from "bignumber.js";
import { promisify as bluebirdPromisify } from "bluebird";
import * as moment from "moment";

import { web3Instance } from "./web3Provider";

export const Q18 = new BigNumber("10").pow(18);

export function asMomentDate(bignum: BigNumber) {
  const asInt = bignum.toNumber();

  return moment.utc(asInt, "X");
}

export function asNumber(bignum: BigNumber) {
  return bignum.toNumber();
}

export function asEtherNumber(bignum: BigNumber): BigNumber {
  return web3Instance.fromWei(bignum, "ether");
}

export function asWeiNumber(num: BigNumber | string | number): BigNumber | string {
  return web3Instance.toWei(num, "ether");
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

// takes ulps and returns wei
export function convertEurToEth(ethEurFraction: BigNumber, eurUlps: BigNumber): BigNumber {
  return eurUlps.div(ethEurFraction).mul(Q18);
}

export async function getCurrentBlockHash(): Promise<string> {
  const blockNumber = await bluebirdPromisify(web3Instance.eth.getBlockNumber)();
  const block = await (bluebirdPromisify(web3Instance.eth.getBlock) as any)(blockNumber);
  return block.hash as any;
}
