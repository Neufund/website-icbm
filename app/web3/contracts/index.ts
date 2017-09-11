import { BigNumber } from "bignumber.js";
import { promisifyAll } from "bluebird";
import { web3Instance } from "../web3Provider";
import * as PublicCommitmentJson from "./PublicCommitment.json";

interface ICrowdsale {
  startDateAsync(): Promise<BigNumber>;
  endDateAsync(): Promise<BigNumber>;
  maxAbsCapAsync(): Promise<BigNumber>;
  minAbsCapAsync(): Promise<BigNumber>;
}

export const Crowdsale = (address: string): ICrowdsale => {
  const ret = promisifyAll(web3Instance.eth.contract(PublicCommitmentJson).at(address)) as any;
  return ret;
};
