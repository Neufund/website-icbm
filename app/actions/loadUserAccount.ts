import { ThunkAction } from "redux-thunk";
import { IAppState } from "../reducers/index";
import { IStandardReduxAction } from "../types";
import { loadUserAccountFromWeb3 } from "../web3/loadUserAccountFromWeb3";
import { SET_USER_ACCOUNT } from "./constants";

export function setUserAccountAction(account: string): IStandardReduxAction {
  return {
    type: SET_USER_ACCOUNT,
    payload: {
      address: account,
    },
  };
}

export const loadUserAccount: ThunkAction<{}, IAppState, {}> = async dispatcher => {
  const account = await loadUserAccountFromWeb3();
  dispatcher(setUserAccountAction(account));
};
