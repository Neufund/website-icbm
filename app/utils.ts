// tslint:disable-next-line
import { BigNumber } from "bignumber.js";
import { commitmentStartDate } from "./config";
import { asEtherNumber } from "./web3/utils";

export async function loadIcoParamsFromEnviroment() {
  return {
    minCap: asEtherNumber(new BigNumber(10 * 10 ** 18)),
    maxCap: asEtherNumber(new BigNumber(666 * 10 ** 18)),
    startDate: commitmentStartDate,
    endDate: "2017-11-15",
  };
}
