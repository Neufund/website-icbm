import { ThunkAction } from "redux-thunk";

import { IAppState } from "../reducers/index";
import { IStandardReduxAction } from "../types";
import { loadUserAccountFromWeb3 } from "../web3/loadUserAccountFromWeb3";
import { ledgerInstance } from "../web3/web3Provider";
import { SET_DERIVATION_PATH, SET_LOADING_USER_ACCOUNT, SET_USER_ACCOUNT } from "./constants";

export function setUserAccountAction(account: string): IStandardReduxAction {
  return {
    type: SET_USER_ACCOUNT,
    payload: {
      address: account,
    },
  };
}

export function setUserDerivationPathAction(derivationPath: string): IStandardReduxAction {
  return {
    type: SET_DERIVATION_PATH,
    payload: {
      derivationPath,
    },
  };
}

export function setLoadingAction(isLoading: boolean): IStandardReduxAction {
  return {
    type: SET_LOADING_USER_ACCOUNT,
    payload: {
      loading: isLoading,
    },
  };
}

/*
  TODO: this should be refactored as now naming is very confusing but we are going to change flows that will affect those function massively
  setUserAccount is used with ledger
  loadUserAccount is used with injected web3 provider
*/

export const setUserAccount: (
  derivationPath: string,
  account: string
) => ThunkAction<{}, IAppState, {}> = (derivationPath, account) => async dispatcher => {
  dispatcher(setUserDerivationPathAction(derivationPath));
  dispatcher(setUserAccountAction(account));
  ledgerInstance.setDerivationPath(derivationPath);
};

export const loadUserAccount: ThunkAction<{}, IAppState, {}> = async (dispatcher, getState) => {
  const account = await loadUserAccountFromWeb3();
  const { userState } = getState();
  if (account && account !== userState.address) {
    dispatcher(setUserAccountAction(account));
  }
};
