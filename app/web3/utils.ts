import { BigNumber } from "bignumber.js";
import * as moment from "moment";
import { Web3Service } from "./web3Service";

export const Q18 = new BigNumber("10").pow(18);

export function asMomentDate(bignum: BigNumber) {
  const asInt = bignum.toNumber();

  return moment.utc(asInt, "X");
}

export function asNumber(bignum: BigNumber) {
  return bignum.toNumber();
}

export function asEtherNumber(bignum: BigNumber): BigNumber {
  return Web3Service.instance.rawWeb3.fromWei(bignum, "ether");
}

export function asWeiNumber(num: BigNumber | string | number): BigNumber | string {
  return Web3Service.instance.rawWeb3.toWei(num as any, "ether");
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
  const blockNumber = await Web3Service.instance.getBlockNumber();
  const block = await Web3Service.instance.getBlock(blockNumber);
  return (block as any).hash;
}

export async function getNetworkId(web3: any): Promise<string> {
  return promisify(web3.version.getNetwork, []);
}

export function networkIdToNetworkName(networkId: string) {
  switch (networkId) {
    case "1":
      return "Mainnet";
    case "2":
      return "Morden";
    case "3":
      return "Ropsten";
    case "4":
      return "Rinkeby";
    case "42":
      return "Kovan";
    default:
      return `Unknown (id:${networkId})`;
  }
}
