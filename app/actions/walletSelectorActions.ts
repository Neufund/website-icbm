import { ThunkAction } from "redux-thunk";
import { LedgerService } from "../ledgerService";
import { IAppState } from "../reducers/index";
import { getNetworkId } from "../web3/utils";
import { Web3Service } from "../web3/web3Service";
import {
  WALLET_SELECTOR_CONNECTED_TO_LEDGER,
  WALLET_SELECTOR_INIT_LEDGER_SELECTION,
} from "./constants";
import { ledgerGetAddresses } from "./ledgerAddressChooser";

export const initLedgerSelectionAction = () => ({
  type: WALLET_SELECTOR_INIT_LEDGER_SELECTION,
});

export const connectedToLedgerAction = () => ({
  type: WALLET_SELECTOR_CONNECTED_TO_LEDGER,
});

export const initLedgerConnection: ThunkAction<{}, IAppState, {}> = async dispatch => {
  const networkId = await getNetworkId(Web3Service.instance.rawWeb3);
  const ledgerWeb3 = await LedgerService.init(networkId);
  dispatch(connectedToLedgerAction());
};
