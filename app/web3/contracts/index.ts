import { BigNumber } from "bignumber.js";
import { promisifyAll } from "bluebird";
import { web3Instance } from "../web3Provider";

const PublicCommitment = require("./PublicCommitment.json"); // tslint:disable-line

interface ICrowdsale {
  startDateAsync(): Promise<BigNumber>;
  endDateAsync(): Promise<BigNumber>;
  maxAbsCapAsync(): Promise<BigNumber>;
  minAbsCapAsync(): Promise<BigNumber>;
  //  minCapAsync(): Promise<any>;
  //  maxCapAsync(): Promise<any>;
  // commitAsync(params: { value: number; from: string; gas: number }): Promise<{}>;
}

export const Crowdsale = (address: string): ICrowdsale => {
  const ret = promisifyAll(web3Instance.eth.contract(PublicCommitment.abi).at(address)) as any;
  return ret;
};
