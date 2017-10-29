import { ThunkAction } from "redux-thunk";

import { IAppState } from "../reducers/index";
import { IStandardReduxAction } from "../types";
import { getBalanceFromWeb3, loadUserAccountFromWeb3 } from "../web3/loadUserAccountFromWeb3";
import { SET_DERIVATION_PATH, SET_LOADING_USER_ACCOUNT, SET_USER_ACCOUNT } from "./constants";

export function setUserAccountAction(account: string, balance: string): IStandardReduxAction {
  return {
    type: SET_USER_ACCOUNT,
    payload: {
      balance,
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
  const balance = await getBalanceFromWeb3(account);
  dispatcher(setUserAccountAction(account, balance.toString()));
  // ledgerInstance.setDerivationPath(derivationPath);
};

export const loadUserAccount: ThunkAction<{}, IAppState, {}> = async (dispatcher, getState) => {
  const account = await loadUserAccountFromWeb3();
  const { userState } = getState();
  if (account && account !== userState.address) {
    const balance = await getBalanceFromWeb3(account);
    dispatcher(setUserAccountAction(account, balance.toString()));
  }
};
