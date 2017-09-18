import { ThunkAction } from "redux-thunk";
import { IAppState } from "../reducers/index";
import { IStandardReduxAction } from "../types";
import { loadBeforeIcoDetailsFromContract } from "../web3/loadBeforeIcoDetailsFromContract";
import { LOAD_BEFORE_ICO } from "./constants";

export function loadBeforeIcoDetailsAction(neumarkInitialRate: string): IStandardReduxAction {
  return {
    type: LOAD_BEFORE_ICO,
    payload: {
      neumarkInitialRate,
    },
  };
}

export const loadBeforeIcoDetails: ThunkAction<{}, IAppState, {}> = async dispatcher => {
  const { neumarkInitialRate } = await loadBeforeIcoDetailsFromContract();

  dispatcher(loadBeforeIcoDetailsAction(neumarkInitialRate.toString()));
};
