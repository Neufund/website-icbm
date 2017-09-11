import { BigNumber } from "bignumber.js";
import { ThunkAction } from "redux-thunk";
import config from "../config";
import { IAppState } from "../reducers";
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

export const loadIcoParams: ThunkAction<{}, IAppState, {}> = async dispatch => {
  const address = config.contractsDeployed.commitmentContractAddress;
  const { minCap, maxCap, startDate, endDate } = await loadIcoParamsFromContract(address);
  dispatch(loadIcoParamsAction(startDate, endDate, minCap, maxCap));
};
