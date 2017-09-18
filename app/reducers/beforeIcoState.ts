import * as BigNumber from "bignumber.js";
import * as moment from "moment";
import { Moment } from "moment";
import {
  IcoPhase,
  LOAD_BEFORE_ICO,
  LOAD_ICO_PARAMS,
  NEW_PHASE_ACTION,
} from "../actions/constants";
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
    case LOAD_BEFORE_ICO:
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
