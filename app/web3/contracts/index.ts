import { BigNumber } from "bignumber.js";
import { promisifyAll } from "bluebird";
import config from "../../config";
import { web3Instance } from "../web3Provider";
const PublicCommitment = require("./PublicCommitment.json"); // tslint:disable-line
const NeumarkAbi = require("./Neumark.json"); // tslint:disable-line

interface ICrowdsale {
  startDateAsync(): Promise<BigNumber>;
  endDateAsync(): Promise<BigNumber>;
  maxAbsCapAsync(): Promise<BigNumber>;
  minAbsCapAsync(): Promise<BigNumber>;
  neumarkAsync(): Promise<string>;
}

export interface INeumark {
  balanceOfAsync(address: string): Promise<BigNumber>;
}

export const Crowdsale = (): ICrowdsale => {
  const ret = promisifyAll(
    web3Instance.eth
      .contract(PublicCommitment)
      .at(config.contractsDeployed.commitmentContractAddress)
  ) as ICrowdsale;

  return ret;
};

export const Neumark = async (): Promise<INeumark> => {
  const ret = promisifyAll(
    web3Instance.eth.contract(NeumarkAbi).at(await Crowdsale().neumarkAsync())
  ) as INeumark;
  return ret;
};
