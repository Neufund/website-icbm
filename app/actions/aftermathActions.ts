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
  lockedAmountEth: string,
  lockedAmountEuro: string,
  neumarkBalance: string,
  unlockDateEth: string,
  unlockDateEuro: string,
  address: string
): IStandardReduxAction {
  return {
    type: SET_AFTERMATH,
    payload: {
      lockedAmountEth,
      lockedAmountEuro,
      neumarkBalance,
      unlockDateEth,
      unlockDateEuro,
      address,
    },
  };
}

export const loadAftermathDetails: (
  address: string
) => ThunkAction<{}, IAppState, {}> = address => async dispatcher => {
  dispatcher(loadingAftermathAction());

  const {
    lockedAmountEth,
    lockedAmountEuro,
    neumarkBalance,
    unlockDateEth,
    unlockDateEuro,
  } = await loadAftermathFromContract(address);

  dispatcher(
    setAftermathAction(
      lockedAmountEth,
      lockedAmountEuro,
      neumarkBalance,
      unlockDateEth,
      unlockDateEuro,
      address
    )
  );
};
