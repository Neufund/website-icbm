import { BigNumber } from "bignumber.js";
import * as bluebird from "bluebird";
import * as moment from "moment";

import { EthNetwork, Web3Type } from "../actions/constants";
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

export async function getNetworkId(web3: any): Promise<EthNetwork> {
  return bluebird.promisify<string>(web3.version.getNetwork)().then(res =>
    networkIdToEthNetwork(res)
  );
}

export async function getNodeType(web3: any): Promise<Web3Type> {
  const nodeIdString = await bluebird.promisify<string>(web3.version.getNode)();
  const matchNodeIdString = nodeIdString.toLowerCase();

  if (matchNodeIdString.includes("metamask")) {
    return Web3Type.METAMASK;
  }
  if (matchNodeIdString.includes("parity")) {
    return Web3Type.PARITY;
  }
  // @todo support for mist
  return Web3Type.GENERIC;
}

export function networkIdToEthNetwork(networkId: string): EthNetwork {
  switch (networkId) {
    case "1":
      return EthNetwork.MAINNET;
    case "2":
      return EthNetwork.MORDEN;
    case "3":
      return EthNetwork.ROPSTEN;
    case "4":
      return EthNetwork.RIKENBY;
    case "42":
      return EthNetwork.KOVAN;
    default:
      return EthNetwork.DEV;
  }
}
