import { ThunkAction } from "redux-thunk";

import { IAppState } from "../reducers/index";
import { IStandardReduxAction } from "../types";
import { getBalanceFromWeb3, loadUserAccountFromWeb3 } from "../web3/loadUserAccountFromWeb3";
import { SET_LOADING_USER_ACCOUNT, SET_USER_ACCOUNT } from "./constants";

export function setUserAccountAction(account: string, balance: string): IStandardReduxAction {
  return {
    type: SET_USER_ACCOUNT,
    payload: {
      balance,
      address: account,
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

export const loadUserAccount: ThunkAction<{}, IAppState, {}> = async (dispatcher, getState) => {
  const account = await loadUserAccountFromWeb3();
  const { userState } = getState();
  if (account && account !== userState.address) {
    const balance = await getBalanceFromWeb3(account);
    dispatcher(setUserAccountAction(account, balance.toString()));
  }
};
