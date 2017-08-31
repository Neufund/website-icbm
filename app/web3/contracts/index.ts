import { BigNumber } from "bignumber.js";
import { promisifyAll } from "bluebird";
import { commitmentContractAdress } from "../../config";
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
    web3Instance.eth.contract(PublicCommitment.abi).at(commitmentContractAdress)
  ) as any;
  return ret;
};
