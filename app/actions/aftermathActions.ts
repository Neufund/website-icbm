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
  lockedAmountEur: string,
  neumarkBalanceEth: string,
  neumarkBalanceEur: string,
  unlockDateEth: string,
  unlockDateEur: string,
  neumarkBalance: string,
  address: string,
  penaltyFractionEth: string
): IStandardReduxAction {
  return {
    type: SET_AFTERMATH,
    payload: {
      lockedAmountEth,
      lockedAmountEur,
      neumarkBalanceEth,
      neumarkBalanceEur,
      unlockDateEth,
      unlockDateEur,
      neumarkBalance,
      address,
      penaltyFractionEth,
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
    neumarkBalanceEth,
    neumarkBalanceEur,
    unlockDateEth,
    unlockDateEuro,
    neumarkBalance,
    penaltyFractionEth,
  } = await loadAftermathFromContract(address);

  dispatcher(
    setAftermathAction(
      lockedAmountEth,
      lockedAmountEuro,
      neumarkBalanceEth,
      neumarkBalanceEur,
      unlockDateEth,
      unlockDateEuro,
      neumarkBalance,
      address,
      penaltyFractionEth
    )
  );
};
