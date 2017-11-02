import * as BigNumber from "bignumber.js";
import { LOADING_DURING_ICO_DETAILS, SET_DURING_ICO_DETAILS } from "../actions/constants";
import { Reducer } from "../types";

export interface IDuringIcoState {
  loading: boolean;
  totalSupply?: string;
  issuanceRate?: string;
  allFunds?: string;
  allInvestors?: string;
}

const initialState: IDuringIcoState = {
  loading: true,
};

const reducer: Reducer<IDuringIcoState> = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOADING_DURING_ICO_DETAILS:
      return {
        ...state,
        loading: true,
      };
    case SET_DURING_ICO_DETAILS:
      return {
        ...state,
        loading: false,
        totalSupply: payload.totalSupply,
        issuanceRate: payload.issuanceRate,
        allFunds: payload.allFunds,
        allInvestors: payload.allInvestors,
      };
    default:
      return state;
  }
};

export default reducer;

export function selectLoadingState(state: IDuringIcoState): boolean {
  return state.loading;
}

export function selectTotalSupply(state: IDuringIcoState): BigNumber.BigNumber {
  return state.totalSupply ? new BigNumber.BigNumber(state.totalSupply) : null;
}

export function selectIssuanceRate(state: IDuringIcoState): BigNumber.BigNumber {
  return state.issuanceRate ? new BigNumber.BigNumber(state.issuanceRate) : null;
}

export function selectAllFunds(state: IDuringIcoState): BigNumber.BigNumber {
  return state.allFunds ? new BigNumber.BigNumber(state.allFunds) : null;
}

export function selectAllFundsInBaseCurrency(
  state: IDuringIcoState,
  ethDecimals: number
): BigNumber.BigNumber {
  return state.allFunds
    ? new BigNumber.BigNumber(state.allFunds).div(new BigNumber.BigNumber(10).pow(ethDecimals))
    : null;
}

export function selectAllInvestors(state: IDuringIcoState): BigNumber.BigNumber {
  return state.allFunds ? new BigNumber.BigNumber(state.allInvestors) : null;
}
