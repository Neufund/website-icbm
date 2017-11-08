import {
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
  otherWalletSelected: boolean;
}

const initialState: IWalletSelectorState = {
  walletInBrowserSelected: false,
  walletInBrowserInitialized: false,
  walletInBrowserError: null,
  ledgerWalletSelected: false,
  otherWalletSelected: true,
};

const reducer: Reducer<IWalletSelectorState> = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case WALLET_SELECTOR_WALLET_IN_BROWSER_SELECTED:
      return {
        ...state,
        walletInBrowserSelected: true,
        walletInBrowserError: null,
        ledgerWalletSelected: false,
        otherWalletSelected: false,
      };
    case WALLET_SELECTOR_WALLET_IN_BROWSER_ERROR:
      return {
        ...state,
        walletInBrowserError: payload.message,
      };
    case WALLET_SELECTOR_LEDGER_WALLET_SELECTED:
      return {
        ...state,
        walletInBrowserSelected: false,
        ledgerWalletSelected: true,
        otherWalletSelected: false,
      };
    case WALLET_SELECTOR_OTHER_WALLET_SELECTED:
      return {
        ...state,
        walletInBrowserSelected: false,
        ledgerWalletSelected: false,
        otherWalletSelected: true,
      };
    default:
      return state;
  }
};

export default reducer;

// export function selectShouldDisplayIntegrationModal(state: IWalletSelectorState) {
//   return state.ledgerIntegrationInProgress || state.ethBrowserIntegrationInProgress;
// }
