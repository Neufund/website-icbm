import { BigNumber } from "bignumber.js";
import { promisifyAll } from "bluebird";
import { commitmentContractAddress } from "../../config";
import { web3Instance } from "../web3Provider";
const PublicCommitment = require("./PublicCommitment.json"); // tslint:disable-line

interface ICrowdsale {
  startDateAsync(): Promise<BigNumber>;
  endDateAsync(): Promise<BigNumber>;
  maxAbsCapAsync(): Promise<BigNumber>;
  minAbsCapAsync(): Promise<BigNumber>;
}

export const Crowdsale = (address: string): ICrowdsale => {
  const ret = promisifyAll(
    web3Instance.eth.contract(PublicCommitment).at(commitmentContractAddress)
  ) as any;
  return ret;
};
