import * as BigNumber from "bignumber.js";

import {
  InvestorType,
  SET_DERIVATION_PATH,
  SET_LOADING_USER_ACCOUNT,
  SET_USER_ACCOUNT,
  Web3Type,
} from "../actions/constants";
import { Reducer } from "../types";
import { IWeb3State } from "./web3State";

export interface IUserState {
  loading: boolean;
  address: string;
  derivationPath: string;
  balance: string;
  investorType: InvestorType;
  reservedTicket?: string;
  reservedNeumarks?: string;
}

const initialState: IUserState = {
  loading: true,
  address: null,
  derivationPath: null,
  balance: null,
  investorType: null,
  reservedTicket: null,
  reservedNeumarks: null,
};

const reducer: Reducer<IUserState> = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_LOADING_USER_ACCOUNT:
      return {
        ...state,
        loading: payload.loading,
      };
    // TODO: we need to decide on consistent naming account vs address
    case SET_USER_ACCOUNT:
      return {
        ...state,
        loading: false,
        address: payload.address,
        balance: payload.balance,
        investorType: payload.investorType,
        reservedTicket: payload.preferredTicket,
        reservedNeumarks: payload.reservedNeumarks,
      };
    case SET_DERIVATION_PATH:
      return {
        ...state,
        derivationPath: payload.derivationPath,
      };
    default:
      return state;
  }
};

export default reducer;

export function selectIsKnownUser(state: IUserState, web3State: IWeb3State): boolean {
  return web3State.web3Type !== Web3Type.UNKNOWN && state.address !== null;
}

export function selectLoading(state: IUserState): boolean {
  return state.loading;
}

export function selectDerivationPath(state: IUserState): string {
  return state.derivationPath;
}

export function selectBalance(state: IUserState): BigNumber.BigNumber {
  return new BigNumber.BigNumber(state.balance);
}

export function selectReservedTicket(state: IUserState): BigNumber.BigNumber {
  return new BigNumber.BigNumber(state.reservedTicket);
}

export function selectReservedNeumarks(state: IUserState): BigNumber.BigNumber {
  return new BigNumber.BigNumber(state.reservedNeumarks);
}
