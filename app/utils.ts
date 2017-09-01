import * as bigNumber from "bignumber.js";
import { commitmentStartDate } from "./config";
import { asEtherNumber } from "./web3/utils";

export async function loadIcoParamsFromEnviroment() {
  return {
    minCap: asEtherNumber(new bigNumber(10 * 10 ** 18)),
    maxCap: asEtherNumber(new bigNumber(666 * 10 ** 18)),
    startDate: commitmentStartDate,
    endDate: "2017-11-15",
  };
}
