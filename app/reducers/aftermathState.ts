import { BigNumber } from "bignumber.js";
import * as moment from "moment";
import { LOAD_AFTERMATH, SET_AFTERMATH } from "../actions/constants";
import { Reducer } from "../types";

export interface IAftermathState {
  loading: boolean;
  lockedAmountEth?: string;
  neumarkBalanceEth?: string;
  unlockDateEth?: string;
  lockedAmountEur?: string;
  neumarkBalanceEur?: string;
  unlockDateEur?: string;
  neumarkBalance?: string;
  address?: string;
  penaltyFractionEth?: string;
}

const initialState: IAftermathState = {
  loading: true,
  lockedAmountEth: null,
  neumarkBalanceEth: null,
  unlockDateEth: null,
  lockedAmountEur: null,
  neumarkBalanceEur: null,
  unlockDateEur: null,
};

const reducer: Reducer<IAftermathState> = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_AFTERMATH:
      return {
        ...state,
        lockedAmountEth: null,
        neumarkBalanceEth: null,
        unlockDateEth: null,
        address: null,
      };
    case SET_AFTERMATH:
      return {
        ...state,
        loading: false,
        lockedAmountEth: payload.lockedAmountEth,
        lockedAmountEur: payload.lockedAmountEur,
        neumarkBalanceEth: payload.neumarkBalanceEth,
        neumarkBalanceEur: payload.neumarkBalanceEur,
        unlockDateEth: payload.unlockDateEth,
        unlockDateEur: payload.unlockDateEur,
        neumarkBalance: payload.neumarkBalance,
        address: payload.address,
        penaltyFractionEth: payload.penaltyFractionEth,
      };
    default:
      return state;
  }
};

export default reducer;

export function selectLoading(state: IAftermathState): boolean {
  return state.loading;
}

export function isAddressSet(state: IAftermathState): boolean {
  return !!state.address;
}

export function selectLockedAmount(state: IAftermathState): BigNumber {
  return state.lockedAmountEth && new BigNumber(state.lockedAmountEth);
}

export function selectNeumarkBalance(state: IAftermathState): BigNumber {
  return state.neumarkBalanceEth && new BigNumber(state.neumarkBalanceEth);
}

export function selectShowDocuments(state: IAftermathState): boolean {
  const balance = selectNeumarkBalance(state);
  return balance ? balance.toNumber() > 0 : false;
}

export function selectUnlockDateEth(state: IAftermathState): moment.Moment {
  return (
    state.unlockDateEth &&
    state.unlockDateEth !== "1970-01-01T00:00:00.000Z" &&
    moment(state.unlockDateEth)
  );
}

export function selectUnlockDateEur(state: IAftermathState): moment.Moment {
  return (
    state.unlockDateEur &&
    state.unlockDateEur !== "1970-01-01T00:00:00.000Z" &&
    moment(state.unlockDateEur)
  );
}
