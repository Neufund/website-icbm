import { BigNumber } from "bignumber.js";
import * as moment from "moment";
import { Dispatch } from "redux";
import { selectAddress } from "../reducers/icoParameters";
import loadIcoParamsFromContract from "../web3/loadIcoParamsFromContract";
import { LOAD_ICO_PARAMS } from "./constants";

export function loadIcoParamsAction(
  startDate: moment.Moment,
  endDate: moment.Moment,
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
  const { minCap, maxCap, startDate, endDate } = await loadIcoParamsFromContract(address);

  dispatch(loadIcoParamsAction(startDate, endDate, minCap, maxCap));
}
