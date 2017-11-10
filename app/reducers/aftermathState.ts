import { BigNumber } from "bignumber.js";
import * as moment from "moment";
import { LOAD_AFTERMATH, SET_AFTERMATH } from "../actions/constants";
import { Reducer } from "../types";

export interface IAftermathState {
  loading: boolean;
  lockedAmountEth?: string;
  neumarkBalance?: string;
  unlockDateEth?: string;
  address?: string;
}

const initialState: IAftermathState = {
  loading: true,
  lockedAmountEth: null,
  neumarkBalance: null,
  unlockDateEth: null,
};

const reducer: Reducer<IAftermathState> = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_AFTERMATH:
      return {
        ...state,
        lockedAmountEth: null,
        neumarkBalance: null,
        unlockDateEth: null,
        address: null,
      };
    case SET_AFTERMATH:
      return {
        ...state,
        loading: false,
        lockedAmountEth: payload.lockedAmountEth,
        lockedAmountEuro: payload.lockedAmountEuro,
        neumarkBalance: payload.neumarkBalance,
        unlockDateEth: payload.unlockDateEth,
        unlockDateEuro: payload.unlockDateEuro,
        address: payload.address,
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
  return state.neumarkBalance && new BigNumber(state.neumarkBalance);
}

export function selectShowDocuments(state: IAftermathState): boolean {
  const balance = selectNeumarkBalance(state);
  return balance ? balance.toNumber() > 0 : false;
}

export function selectUnlockDate(state: IAftermathState): moment.Moment {
  return (
    state.unlockDateEth &&
    state.unlockDateEth !== "1970-01-01T00:00:00.000Z" &&
    moment(state.unlockDateEth)
  );
}
