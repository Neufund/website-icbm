import * as BigNumber from "bignumber.js";
import { LOADING_DURING_ICO_DETAILS, SET_DURING_ICO_DETAILS } from "../actions/constants";
import { Reducer } from "../types";

export interface IDuringIcoState {
  loading: boolean;
  totalNeumarkSupply?: string;
  reservedNeumarks?: string;
  issuanceRate?: string;
  ethCommitted?: string;
  euroCommittedInWei?: string;
  allInvestors?: string;
  platformOperatorNeumarkRewardShare?: string;
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
        totalNeumarkSupply: payload.totalNeumarkSupply,
        reservedNeumarks: payload.reservedNeumarks,
        issuanceRate: payload.issuanceRate,
        ethCommitted: payload.ethCommitted,
        euroCommittedInWei: payload.euroCommitted,
        allInvestors: payload.allInvestors,
        platformOperatorNeumarkRewardShare: payload.platformOperatorNeumarkRewardShare,
      };
    default:
      return state;
  }
};

export default reducer;

export function selectLoadingState(state: IDuringIcoState): boolean {
  return state.loading;
}

export function selectInvestorsNeumarks(state: IDuringIcoState): BigNumber.BigNumber {
  if (!state.totalNeumarkSupply || !state.reservedNeumarks) {
    return null;
  }
  const totalNeumarkSupply = new BigNumber.BigNumber(state.totalNeumarkSupply);
  const reservedNeumarks = new BigNumber.BigNumber(state.reservedNeumarks);
  return totalNeumarkSupply.sub(reservedNeumarks).div(state.platformOperatorNeumarkRewardShare);
}

export function selectIssuanceRate(state: IDuringIcoState): BigNumber.BigNumber {
  return state.issuanceRate ? new BigNumber.BigNumber(state.issuanceRate) : null;
}

export function selectAllFunds(state: IDuringIcoState): BigNumber.BigNumber {
  if (!state.ethCommitted || !state.euroCommittedInWei) {
    return null;
  }
  return new BigNumber.BigNumber(state.ethCommitted).add(
    new BigNumber.BigNumber(state.euroCommittedInWei)
  );
}

export function selectAllFundsInBaseCurrency(
  state: IDuringIcoState,
  ethDecimals: number
): BigNumber.BigNumber {
  const allFunds = selectAllFunds(state);
  return allFunds ? allFunds.div(new BigNumber.BigNumber(10).pow(ethDecimals)) : null;
}

export function selectAllInvestors(state: IDuringIcoState): BigNumber.BigNumber {
  return state.allInvestors ? new BigNumber.BigNumber(state.allInvestors) : null;
}
