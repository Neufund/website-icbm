import { BigNumber } from "bignumber.js";
import { asEtherNumber } from "./web3/utils";

function getEnvValue(obj: any, key: string) {
  if (obj[key] === undefined) {
    throw new Error(`${key} is not exists in .env file`);
  }
  return obj[key];
}

export const commitmentContractAddress: string = getEnvValue(
  process.env,
  "COMMITMENT_CONTRACT_ADDRESS"
);

export const commitmentStartDate: string = getEnvValue(process.env, "ICO_START_DATE");

export const RpcProvider: string = getEnvValue(process.env, "RPC_PROVIDER");

export async function loadIcoParamsFromEnviroment() {
  return {
    minCap: asEtherNumber(new BigNumber(10 * 10 ** 18)),
    maxCap: asEtherNumber(new BigNumber(666 * 10 ** 18)),
    startDate: commitmentStartDate,
    endDate: "2017-11-15",
  };
}
