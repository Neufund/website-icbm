import { BigNumber } from "bignumber.js";
import { promisifyAll } from "bluebird";
import { web3Instance } from "../web3Provider";

const CommitmentBase = require("./CommitmentBase.json"); // tslint:disable-line

interface ICrowdsale {
  startDateAsync(): Promise<BigNumber>;
  endDateAsync(): Promise<BigNumber>;
  maxCap: Promise<any>;
  minCap: Promise<any>;
  //  minCapAsync(): Promise<any>;
  //  maxCapAsync(): Promise<any>;
  // commitAsync(params: { value: number; from: string; gas: number }): Promise<{}>;
}
export const Crowdsale = (address: string): ICrowdsale => {
  const ret = promisifyAll(web3Instance.eth.contract(CommitmentBase.abi).at(address)) as any;
  return ret;
};
