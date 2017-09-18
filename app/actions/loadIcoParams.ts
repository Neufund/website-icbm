import { BigNumber } from "bignumber.js";
import { ThunkAction } from "redux-thunk";
import config from "../config";
import { IAppState } from "../reducers";
import { loadIcoParamsFromContract } from "../web3/loadIcoParamsFromContract";
import { IcoPhase, LOAD_ICO_PARAMS } from "./constants";

export function loadIcoParamsAction(
  commitmentState: IcoPhase,
  startingDate: string,
  finishDate: string
) {
  return {
    type: LOAD_ICO_PARAMS,
    payload: {
      commitmentState,
      startingDate,
      finishDate,
    },
  };
}

export const loadIcoParams: ThunkAction<{}, IAppState, {}> = async dispatch => {
  const address = config.contractsDeployed.commitmentContractAddress;
  const { commitmentState, startingDate, finishDate } = await loadIcoParamsFromContract();
  dispatch(loadIcoParamsAction(commitmentState, startingDate, finishDate));
};
