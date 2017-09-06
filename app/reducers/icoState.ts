import * as moment from "moment";
import { checkPhase } from "../actions/checkPhase";
import { IcoPhase, LOAD_ICO_PARAMS, NEW_PHASE_ACTION } from "../actions/constants";

export interface IcoState {
  loading: boolean;
  address: string;
  startDate: string;
  endDate: string;
  minCap: number;
  maxCap: number;
  icoPhase: IcoPhase;
}

interface IStandardReduxAction<T> {
  type: string;
  payload: T;
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
  address: null,
  startDate: null,
  endDate: null,
  minCap: 0,
  maxCap: 0,
  icoPhase: IcoPhase.UNKNOWN,
};

export default function(
  state = initialState,
  action: IStandardReduxAction<IPayload & IcoPhase> // This is done to somehow define or enforce a more strict typings then any but needs more work to create a good strict typings
): IcoState {
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
}

export function selectAddress(state: IcoState) {
  return state.address;
}

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
