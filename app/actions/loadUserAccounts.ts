import { ThunkAction } from "redux-thunk";
import { IAppState } from "../reducers/index";
import { IStandardReduxAction } from "../types";
import { loadUserAccountsFromWeb3 } from "../web3/loadUserAccountsFromWeb3";
import { LOAD_USER_ACCOUNTS, SET_USER_ACCOUNTS } from "./constants";

export function loadUserAccountsAction(): IStandardReduxAction {
  return {
    type: LOAD_USER_ACCOUNTS,
    payload: {},
  };
}

export function setUserAccountsAction(accounts: string[]): IStandardReduxAction {
  return {
    type: SET_USER_ACCOUNTS,
    payload: {
      accounts,
    },
  };
}

export const loadUserAccounts: ThunkAction<{}, IAppState, {}> = async dispatcher => {
  dispatcher(loadUserAccountsAction);

  const accounts = await loadUserAccountsFromWeb3();

  dispatcher(setUserAccountsAction(accounts));
};
