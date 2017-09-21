import { ThunkAction } from "redux-thunk";
import { IAppState } from "../reducers/index";
import { submitFundsToContract } from "../web3/submitFundsToContract";

export const submitFunds: (value: string) => ThunkAction<{}, IAppState, {}> = value => async (
  _dispatcher,
  getState
) => {
  try {
    const selectedAccount = getState().userState.selectedAddress;
    await submitFundsToContract(value, selectedAccount);
  } catch (e) {
    // tslint:disable-next-line
    console.log("ERROR", e);
  }
};
