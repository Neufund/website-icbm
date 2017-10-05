import * as jQuery from "jquery";
import { ThunkAction } from "redux-thunk";
import { IAppState } from "../reducers/index";
import { IStandardReduxAction } from "../types";
import { loadUserAccountFromWeb3 } from "../web3/loadUserAccountFromWeb3";
import { SET_USER_ACCOUNT } from "./constants";

export function setUserAccountAction(account: string): IStandardReduxAction {
  jQuery(".footer").removeClass("hidden"); // this has to be done this ugly way as footer is created outside of react app
  return {
    type: SET_USER_ACCOUNT,
    payload: {
      address: account,
    },
  };
}

export const loadUserAccount: ThunkAction<{}, IAppState, {}> = async (dispatcher, getState) => {
  const account = await loadUserAccountFromWeb3();
  const { userState } = getState();
  if (account !== userState.address || userState.loading) {
    dispatcher(setUserAccountAction(account));
  }
};
