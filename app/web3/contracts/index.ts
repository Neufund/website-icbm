import { promisifyAll } from "bluebird";
import { web3Instance } from "../web3Provider";

const CommitmentBase = require("./CommitmentBase.json"); // tslint:disable-line

// declare BigNumber = new bignumber.BigNumber;

interface ICrowdsale {
  startDate: Promise<any>;
  endDate: Promise<any>;
  maxCap: Promise<any>;
  minCap: Promise<any>;
  //  minCapAsync(): Promise<any>;
  //  maxCapAsync(): Promise<any>;
  // commitAsync(params: { value: number; from: string; gas: number }): Promise<{}>;
}
export const Crowdsale = (address: string): ICrowdsale =>
  promisifyAll(web3Instance.eth.contract(CommitmentBase.abi).at(address)) as any;
