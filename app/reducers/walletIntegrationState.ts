import {
  WALLET_SELECTOR_CONNECTED_TO_LEDGER,
  WALLET_SELECTOR_FINISH,
  WALLET_SELECTOR_INIT_ETH_BROWSER_SELECTION,
  WALLET_SELECTOR_INIT_LEDGER_SELECTION,
} from "../actions/constants";
import { Reducer } from "../types";

export interface IWalletIntegrationState {
  ledgerIntegrationInProgress: boolean;
  ledgerIntegrationConnected: boolean;
  ethBrowserInProgress: boolean;
}

const initialState: IWalletIntegrationState = {
  ledgerIntegrationInProgress: false,
  ledgerIntegrationConnected: false,
  ethBrowserInProgress: false,
};

const reducer: Reducer<IWalletIntegrationState> = (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case WALLET_SELECTOR_INIT_LEDGER_SELECTION:
      return {
        ...state,
        ledgerIntegrationInProgress: true,
      };
    case WALLET_SELECTOR_INIT_ETH_BROWSER_SELECTION:
      return {
        ...state,
        ethBrowserInProgress: true,
      };
    case WALLET_SELECTOR_CONNECTED_TO_LEDGER:
      return {
        ...state,
        ledgerIntegrationConnected: true,
      };
    case WALLET_SELECTOR_FINISH:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default reducer;

export function selectShouldDisplayIntegrationModal(state: IWalletIntegrationState) {
  return state.ledgerIntegrationInProgress || state.ethBrowserInProgress;
}
