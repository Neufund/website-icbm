import { Dispatch } from "redux";
import { selectAddress } from "../reducers/icoParameters";
import loadIcoParamsFromContract from "../web3/loadIcoParamsFromContract";
import { LOAD_ICO_PARAMS } from "./constants";

export function loadIcoParamsAction(
  startDate: string,
  endDate: string,
  lockedAccountAddress: string,
  neumarkTokenAddress: string,
  minCap: number,
  maxCap: number
) {
  return {
    type: LOAD_ICO_PARAMS,
    payload: {
      startDate,
      endDate,
      lockedAccountAddress,
      neumarkTokenAddress,
      minCap,
      maxCap,
    },
  };
}

export async function loadIcoParams(dispatch: Dispatch<any>, getState: any) {
  const address = selectAddress(getState().icoParameters);
  const {
    startDate,
    endDate,
    lockedAccountAddress,
    neumarkTokenAddress,
    minCap,
    maxCap,
  } = await loadIcoParamsFromContract(address);

  dispatch(
    loadIcoParamsAction(
      startDate,
      endDate,
      lockedAccountAddress,
      neumarkTokenAddress,
      minCap,
      maxCap
    )
  );
}
