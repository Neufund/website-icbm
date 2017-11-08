import {
  WALLET_SELECTOR_CONNECTED_TO_LEDGER,
  WALLET_SELECTOR_LEDGER_WALLET_ERROR,
  WALLET_SELECTOR_LEDGER_WALLET_SELECTED,
  WALLET_SELECTOR_OTHER_WALLET_SELECTED,
  WALLET_SELECTOR_WALLET_IN_BROWSER_ERROR,
  WALLET_SELECTOR_WALLET_IN_BROWSER_SELECTED,
} from "../actions/constants";
import { Reducer } from "../types";

export interface IWalletSelectorState {
  walletInBrowserSelected: boolean;
  walletInBrowserInitialized: boolean;
  walletInBrowserError: string;
  ledgerWalletSelected: boolean;
  ledgerWalletConnected: boolean;
  ledgerWalletInitialized: boolean;
  ledgerWalletError: string;
  otherWalletSelected: boolean;
}

const initialState: IWalletSelectorState = {
  walletInBrowserSelected: false,
  walletInBrowserInitialized: false,
  walletInBrowserError: null,
  ledgerWalletSelected: false,
  ledgerWalletInitialized: false,
  ledgerWalletConnected: false,
  ledgerWalletError: null,
  otherWalletSelected: true,
};

const reducer: Reducer<IWalletSelectorState> = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case WALLET_SELECTOR_WALLET_IN_BROWSER_SELECTED:
      return {
        ...initialState,
        otherWalletSelected: false,
        walletInBrowserSelected: true,
      };
    case WALLET_SELECTOR_WALLET_IN_BROWSER_ERROR:
      return {
        ...state,
        walletInBrowserError: payload.message,
      };
    case WALLET_SELECTOR_LEDGER_WALLET_SELECTED:
      return {
        ...initialState,
        otherWalletSelected: false,
        ledgerWalletSelected: true,
      };
    case WALLET_SELECTOR_LEDGER_WALLET_ERROR:
      return {
        ...state,
        ledgerWalletError: payload.message,
      };
    case WALLET_SELECTOR_CONNECTED_TO_LEDGER:
      return {
        ...state,
        ledgerWalletConnected: true,
      };
    case WALLET_SELECTOR_OTHER_WALLET_SELECTED:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default reducer;

// export function selectShouldDisplayIntegrationModal(state: IWalletSelectorState) {
//   return state.ledgerIntegrationInProgress || state.ethBrowserIntegrationInProgress;
// }
