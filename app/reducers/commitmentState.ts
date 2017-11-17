import { BigNumber } from "bignumber.js";
import * as moment from "moment";
import {
  IcoPhase,
  LOAD_ESTIMATED_REWARD,
  LOAD_ICO_PARAMS,
  NEW_PHASE_ACTION,
  SET_ESTIMATED_REWARD,
  WALLET_SELECTOR_LEDGER_WALLET_SELECTED,
  WALLET_SELECTOR_OTHER_WALLET_SELECTED,
  WALLET_SELECTOR_WALLET_IN_BROWSER_SELECTED,
} from "../actions/constants";
import { Reducer } from "../types";

export interface ICommitmentState {
  loading: boolean;
  commitmentState?: IcoPhase;
  startingDate?: string;
  finishDate?: string;
  minTicketWei?: string;
  loadingEstimatedReward: boolean;
  estimatedReward?: string;
  euroDecimals: number;
  ethDecimals: number;
  neuDecimals: number;
  ethEurFraction: string;
}

const initialState: ICommitmentState = {
  loading: true,
  loadingEstimatedReward: false,
  estimatedReward: "0",
  ethDecimals: 18,
  euroDecimals: 18,
  neuDecimals: 18,
  ethEurFraction: "0",
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
        loadingEstimatedReward: false,
        estimatedReward: "0",
        euroDecimals: payload.euroDecimals,
        ethDecimals: payload.ethDecimals,
        neuDecimals: payload.neuDecimals,
        ethEurFraction: payload.ethEurFraction,
      };
    case NEW_PHASE_ACTION:
      return {
        ...state,
        commitmentState: payload,
      };
    case LOAD_ESTIMATED_REWARD:
      return {
        ...state,
        loadingEstimatedReward: true,
        estimatedReward: null,
      };
    case SET_ESTIMATED_REWARD:
      return {
        ...state,
        loadingEstimatedReward: false,
        estimatedReward: payload.estimatedReward,
      };
    case WALLET_SELECTOR_WALLET_IN_BROWSER_SELECTED:
    case WALLET_SELECTOR_LEDGER_WALLET_SELECTED:
    case WALLET_SELECTOR_OTHER_WALLET_SELECTED:
      return {
        ...state,
        loadingEstimatedReward: false,
        estimatedReward: "0",
      };
    case "@@router/LOCATION_CHANGE":
      if (payload.pathname === "/commit/wallet-selector") {
        return {
          ...state,
          loadingEstimatedReward: false,
          estimatedReward: "0",
        };
      } else {
        return {
          ...state,
        };
      }
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

export function selectEstimatedRewardLoadingState(state: ICommitmentState): boolean {
  return state.loadingEstimatedReward;
}

export function selectEstimatedReward(state: ICommitmentState): BigNumber {
  return state.estimatedReward ? new BigNumber(state.estimatedReward) : null;
}

export function selectEthEurFractionInBaseCurrency(state: ICommitmentState): BigNumber {
  return new BigNumber(state.ethEurFraction).div(new BigNumber(10).pow(state.euroDecimals));
}
