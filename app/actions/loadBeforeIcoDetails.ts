import { ThunkAction } from "redux-thunk";
import { IAppState } from "../reducers/index";
import { IStandardReduxAction } from "../types";
import { loadBeforeIcoDetailsFromContract } from "../web3/loadBeforeIcoDetailsFromContract";
import { LOAD_BEFORE_ICO_DETAILS } from "./constants";

export function loadBeforeIcoDetailsAction(neumarkInitialRate: string): IStandardReduxAction {
  return {
    type: LOAD_BEFORE_ICO_DETAILS,
    payload: {
      neumarkInitialRate,
    },
  };
}

export const loadBeforeIcoDetails: ThunkAction<{}, IAppState, {}> = async (
  dispatcher,
  getState
) => {
  const { ethDecimals } = getState().commitmentState;

  const { neumarkInitialRate } = await loadBeforeIcoDetailsFromContract(ethDecimals);

  dispatcher(loadBeforeIcoDetailsAction(neumarkInitialRate.toString()));
};
