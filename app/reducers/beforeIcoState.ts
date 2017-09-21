import * as BigNumber from "bignumber.js";
import { LOAD_BEFORE_ICO_DETAILS } from "../actions/constants";
import { Reducer } from "../types";

export interface IBeforeIcoState {
  neumarkInitialRate?: string;
}

const initialState: IBeforeIcoState = {
  neumarkInitialRate: null,
};

const reducer: Reducer<IBeforeIcoState> = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_BEFORE_ICO_DETAILS:
      return {
        ...state,
        neumarkInitialRate: payload.neumarkInitialRate,
      };
    default:
      return state;
  }
};

export default reducer;

export function selectNeumarkInitialRate(state: IBeforeIcoState): BigNumber.BigNumber {
  return state.neumarkInitialRate ? new BigNumber.BigNumber(state.neumarkInitialRate) : null;
}
