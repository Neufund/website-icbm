import {
  AppState,
  LEDGER_DERIVATION_PATH_CHANGE,
  LEDGER_GET_ADDRESSES_LOADED,
  LEDGER_GET_ADDRESSES_LOADING,
  LEDGER_NEXT_PAGE,
  LEDGER_PREV_PAGE,
} from "../actions/constants";
import config from "../config";
import { Reducer } from "../types";

export interface ILedgerAccount {
  address: string;
  derivationPath: string;
  balance: string;
}

export interface ILedgerAddressChooser {
  loading: boolean;
  page: number;
  derivationPath: string;
  accounts: ILedgerAccount[];
}

const initialState: ILedgerAddressChooser = {
  loading: true,
  page: 0,
  derivationPath:
    config.appState === AppState.CONTRACTS_DEPLOYED
      ? config.contractsDeployed.defaultDerivationPath
      : "",
  accounts: [],
};

const reducer: Reducer<ILedgerAddressChooser> = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LEDGER_GET_ADDRESSES_LOADING:
      return {
        ...state,
        loading: true,
        accounts: [],
      };
    case LEDGER_GET_ADDRESSES_LOADED:
      return {
        ...state,
        loading: false,
        accounts: payload.accounts,
      };
    case LEDGER_NEXT_PAGE:
      return {
        ...state,
        page: state.page + 1,
      };
    case LEDGER_PREV_PAGE:
      return {
        ...state,
        page: state.page - 1,
      };
    case LEDGER_DERIVATION_PATH_CHANGE:
      return {
        ...state,
        page: 0,
        derivationPath: payload.derivationPath,
      };
    default:
      return state;
  }
};

export default reducer;

export function selectHasPrevious(state: ILedgerAddressChooser) {
  return state.page > 0;
}
