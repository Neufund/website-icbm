import { BigNumber } from "bignumber.js";
import { Dispatch } from "redux";
// import { selectAddress } from "../reducers/icoParameters";
import { loadIcoParamsFromEnviroment } from "../utils";
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
  // const address = selectAddress(getState().icoParameters);
  // TODO :Choose when to load from ENV or Smart_Contract
  // const { minCap, maxCap, startDate, endDate } = await loadIcoParamsFromContract(address); // FROM SMART CONTRACT
  const { minCap, maxCap, startDate, endDate } = await loadIcoParamsFromEnviroment(); // FROM ENV
  dispatch(loadIcoParamsAction(startDate, endDate, minCap, maxCap));
}
