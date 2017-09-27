import { ThunkAction } from "redux-thunk";
import { IAppState } from "../reducers/index";
import { IStandardReduxAction } from "../types";
import { loadAftermathFromContract } from "../web3/loadAftermathFromContract";
import { LOAD_AFTERMATH, SET_AFTERMATH } from "./constants";

export const loadingAftermathAction: () => IStandardReduxAction = () => ({
  type: LOAD_AFTERMATH,
  payload: {},
});

export function setAftermathAction(
  lockedAmount: string,
  neumarkBalance: string,
  unlockDate: string
): IStandardReduxAction {
  return {
    type: SET_AFTERMATH,
    payload: {
      lockedAmount,
      neumarkBalance,
      unlockDate,
    },
  };
}

export const loadAftermathDetails: (
  address: string
) => ThunkAction<{}, IAppState, {}> = address => async dispatcher => {
  dispatcher(loadingAftermathAction());

  const { lockedAmount, neumarkBalance, unlockDate } = await loadAftermathFromContract(address);

  dispatcher(setAftermathAction(lockedAmount, neumarkBalance, unlockDate));
};
