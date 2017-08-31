import * as moment from "moment";
import { checkPhase } from "../actions/checkPhase";
import { IcoPhase, LOAD_ICO_PARAMS, NEW_PHASE_ACTION } from "../actions/constants";
import { commitmentContractAdress } from "../config";

export interface IcoParametersState {
  loading: boolean;
  address: string;
  startDate: string;
  endDate: string;
  minCap: number;
  maxCap: number;
  icoPhase: IcoPhase;
}

const initialState: IcoParametersState = {
  loading: true,
  address: commitmentContractAdress,
  startDate: null,
  endDate: null,
  minCap: 0,
  maxCap: 0,
  icoPhase: IcoPhase.UNKNOWN,
};

export default function(state = initialState, action: any): IcoParametersState {
  const { type, payload } = action;
  switch (type) {
    case LOAD_ICO_PARAMS:
      return {
        ...state,
        loading: false,
        startDate: payload.startDate,
        endDate: payload.endDate,
        icoPhase: checkPhase(payload),
        minCap: payload.minCap,
        maxCap: payload.maxCap,
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

export function selectAddress(state: IcoParametersState) {
  return state.address;
}

export function selectStartDate(state: IcoParametersState) {
  return moment(state.startDate);
}

export function selectEndDate(state: IcoParametersState) {
  return moment(state.endDate);
}

export function selectIcoPhase(state: IcoParametersState) {
  return state.icoPhase;
}

export function selectLoadingState(state: IcoParametersState) {
  return state.loading;
}
