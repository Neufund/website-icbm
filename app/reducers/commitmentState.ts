import { BigNumber } from "bignumber.js";
import * as moment from "moment";
import { IcoPhase, LOAD_ICO_PARAMS, NEW_PHASE_ACTION } from "../actions/constants";
import { Reducer } from "../types";

export interface ICommitmentState {
  loading: boolean;
  commitmentState?: IcoPhase;
  startingDate?: string;
  finishDate?: string;
  minTicketWei?: string;
}

const initialState: ICommitmentState = {
  loading: true,
};

const reducer: Reducer<ICommitmentState> = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_ICO_PARAMS:
      return {
        ...state,
        loading: false,
        commitmentState: payload.commitmentState,
        startingDate: payload.startingDate,
        finishDate: payload.finishDate,
        minTicketWei: payload.minTicketWei,
      };
    case NEW_PHASE_ACTION:
      return {
        ...state,
        commitmentState: payload,
      };
    default:
      return state;
  }
};

export default reducer;

export function selectStartDate(state: ICommitmentState): moment.Moment {
  return moment(state.startingDate);
}

export function selectEndDate(state: ICommitmentState): moment.Moment {
  return moment(state.finishDate);
}

export function selectIcoState(state: ICommitmentState): IcoPhase {
  return state.commitmentState;
}

export function selectLoadingState(state: ICommitmentState): boolean {
  return state.loading;
}

export function selectMinTicketWei(state: ICommitmentState): BigNumber {
  return state.minTicketWei ? new BigNumber(state.minTicketWei) : null;
}
