import * as moment from "moment";
import { checkPhase } from "../actions/checkPhase";
import { IcoPhase, LOAD_ICO_PARAMS, NEW_PHASE_ACTION } from "../actions/constants";
import { IStandardReduxAction, Reducer } from "../types";

export interface IcoState {
  loading: boolean;
  startDate: string;
  endDate: string;
  minCap: number;
  maxCap: number;
  icoPhase: IcoPhase;
}

interface IPayload {
  loading: boolean;
  startDate: string;
  endDate: string;
  icoPhase: IcoPhase;
  minCap: number;
  maxCap: number;
}

const initialState: IcoState = {
  loading: true,
  startDate: null,
  endDate: null,
  minCap: 0,
  maxCap: 0,
  icoPhase: IcoPhase.UNKNOWN,
};

const reducer: Reducer<IcoState, IPayload & IcoPhase> = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_ICO_PARAMS:
      return {
        ...state,
        loading: false,
        startDate: payload.startDate,
        endDate: payload.endDate,
        minCap: payload.minCap,
        maxCap: payload.maxCap,
        icoPhase: checkPhase(payload as any),
      };
    case NEW_PHASE_ACTION:
      return {
        ...state,
        icoPhase: payload,
      };
    default:
      return state;
  }
};

export default reducer;

export function selectStartDate(state: IcoState) {
  return moment(state.startDate);
}

export function selectEndDate(state: IcoState) {
  return moment(state.endDate);
}

export function selectIcoState(state: IcoState) {
  return state.icoPhase;
}

export function selectLoadingState(state: IcoState) {
  return state.loading;
}
