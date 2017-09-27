import { BigNumber } from "bignumber.js";
import * as moment from "moment";
import { LOAD_AFTERMATH, SET_AFTERMATH } from "../actions/constants";
import { Reducer } from "../types";

export interface IAftermathState {
  loading: boolean;
  lockedAmount?: string;
  neumarkBalance?: string;
  unlockDate?: string;
}

const initialState: IAftermathState = {
  loading: true,
  lockedAmount: null,
  neumarkBalance: null,
  unlockDate: null,
};

const reducer: Reducer<IAftermathState> = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_AFTERMATH:
      return {
        ...state,
        lockedAmount: null,
        neumarkBalance: null,
        unlockDate: null,
      };
    case SET_AFTERMATH:
      return {
        ...state,
        loading: false,
        lockedAmount: payload.lockedAmount,
        neumarkBalance: payload.neumarkBalance,
        unlockDate: payload.unlockDate,
      };
    default:
      return state;
  }
};

export default reducer;

export function selectLoading(state: IAftermathState): boolean {
  return state.loading;
}

export function selectLockedAmount(state: IAftermathState): BigNumber {
  return state.lockedAmount && new BigNumber(state.lockedAmount);
}

export function selectNeumarkBalance(state: IAftermathState): BigNumber {
  return state.neumarkBalance && new BigNumber(state.neumarkBalance);
}

export function selectUnlockDate(state: IAftermathState): moment.Moment {
  return state.unlockDate && moment(state.unlockDate);
}
