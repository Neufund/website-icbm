import { BigNumber } from "bignumber.js";
import { Dispatch } from "redux";
import { envPayload } from "../config";
import { selectAddress } from "../reducers/icoParameters";
import { loadIcoParamsFromContract } from "../web3/loadIcoParamsFromContract";
import { checkBeforeIcoPhase } from "./checkBeforePhase";
import { beforeIcoPhase, LOAD_ICO_PARAMS } from "./constants";

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
  const { minCap = new BigNumber(0), maxCap = new BigNumber(0), startDate, endDate = "00" } =
    checkBeforeIcoPhase() === beforeIcoPhase.ON_BLOCKCHAIN
      ? await loadIcoParamsFromContract(address)
      : { startDate: envPayload.commitmentStartDate };
  dispatch(loadIcoParamsAction(startDate, endDate, minCap, maxCap));
}

// TODO :Change payload to accomedate on Startdate
