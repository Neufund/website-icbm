import { ThunkAction } from "redux-thunk";
import { LedgerService } from "../ledgerService";
import { IAppState } from "../reducers/index";
import { Web3Service } from "../web3/web3Service";
import {
  WALLET_SELECTOR_CONNECTED_TO_LEDGER,
  WALLET_SELECTOR_LEDGER_WALLET_ERROR,
  WALLET_SELECTOR_LEDGER_WALLET_SELECTED,
  WALLET_SELECTOR_OTHER_WALLET_SELECTED,
  WALLET_SELECTOR_WALLET_IN_BROWSER_ERROR,
  WALLET_SELECTOR_WALLET_IN_BROWSER_SELECTED,
} from "./constants";

export const walletInBrowserSelectedAction = () => ({
  type: WALLET_SELECTOR_WALLET_IN_BROWSER_SELECTED,
});

export const walletInBrowserErrorAction = (message: string) => ({
  type: WALLET_SELECTOR_WALLET_IN_BROWSER_ERROR,
  payload: {
    message,
  },
});

export const initWalletInBrowser: ThunkAction<{}, IAppState, {}> = async dispatch => {
  try {
    await Web3Service.instance.injectWeb3();
  } catch (error) {
    dispatch(walletInBrowserErrorAction(error.message));
  }
};

export const walletInBrowserWatchNewAccounts: ThunkAction<{}, IAppState, {}> = async () => {
  await Web3Service.instance.loadAccount();
};

export const ledgerWalletSelectedAction = () => ({
  type: WALLET_SELECTOR_LEDGER_WALLET_SELECTED,
});

export const connectedToLedgerAction = () => ({
  type: WALLET_SELECTOR_CONNECTED_TO_LEDGER,
});

export const ledgerWalletErrorAction = (message: string) => ({
  type: WALLET_SELECTOR_LEDGER_WALLET_ERROR,
  payload: {
    message,
  },
});

export const initLedgerConnection: ThunkAction<{}, IAppState, {}> = async (dispatch, getState) => {
  const state = getState();

  const networkId = state.web3State.ethNetworkId;
  try {
    await LedgerService.init(networkId);
    dispatch(connectedToLedgerAction());
  } catch (e) {
    dispatch(ledgerWalletErrorAction(e.message));
  }
};

export const otherWalletSelectedAction = () => ({
  type: WALLET_SELECTOR_OTHER_WALLET_SELECTED,
});
