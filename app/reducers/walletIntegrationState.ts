import * as BigNumber from "bignumber.js";
import { WALLET_SELECTOR_CONNECTED_TO_LEDGER, WALLET_SELECTOR_INIT_LEDGER_SELECTION } from "../actions/constants";
import { Reducer } from "../types";

export interface IWalletIntegrationState {
  ledgerIntegrationInProgress: boolean;
  ledgerIntegrationConnected: boolean;
}

const initialState: IWalletIntegrationState = {
  ledgerIntegrationInProgress: false,
  ledgerIntegrationConnected: false,
};

const reducer: Reducer<IWalletIntegrationState> = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case WALLET_SELECTOR_INIT_LEDGER_SELECTION:
      return {
        ...state,
        ledgerIntegrationInProgress: true,
      };
    case WALLET_SELECTOR_CONNECTED_TO_LEDGER:
      return {
        ...state,
        ledgerIntegrationConnected: true,
      };
    default:
      return state;
  }
};

export default reducer;
