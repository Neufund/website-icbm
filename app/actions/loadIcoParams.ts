import { BigNumber } from "bignumber.js";
import { Dispatch } from "redux";
import { commitmentStartDate, loadIcoParamsFromEnviroment } from "../config";
import { selectAddress } from "../reducers/icoParameters";
import { loadIcoParamsFromContract } from "../web3/loadIcoParamsFromContract";
import { LOAD_ICO_PARAMS } from "./constants";

export function loadIcoParamsAction(
  startDate: string,
  endDate: string,
  minCap: BigNumber,
  maxCap: BigNumber
) {
  return {
    type: LOAD_ICO_PARAMS,
    payload: {
      startDate,
      endDate,
      minCap,
      maxCap,
    },
  };
}

export async function loadIcoParams(dispatch: Dispatch<any>, getState: any) {
  const address = selectAddress(getState().icoParameters);
  const { minCap, maxCap, startDate, endDate } =
    commitmentStartDate === "0000-00-00T00:00:00.000"
      ? await loadIcoParamsFromContract(address)
      : await loadIcoParamsFromEnviroment();
  dispatch(loadIcoParamsAction(startDate, endDate, minCap, maxCap));
}

// TODO :Choose when to load from ENV or Smart_Contract in a better way
