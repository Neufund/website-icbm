import { EthNetwork, SET_ETH_NETWORK, SET_WEB3_TYPE, Web3Type } from "../actions/constants";
import { Reducer } from "../types";

export interface IWeb3State {
  web3Type: Web3Type;
  ethNetwork: EthNetwork;
}

const initialState: IWeb3State = {
  web3Type: Web3Type.UNKNOWN,
  ethNetwork: null,
};

const reducer: Reducer<IWeb3State> = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_WEB3_TYPE:
      return {
        ...state,
        web3Type: payload.web3Type,
      };
    case SET_ETH_NETWORK:
      return {
        ...state,
        ethNetwork: payload.ethNetwork,
      };
    default:
      return state;
  }
};

export default reducer;

export function selectWeb3Type(state: IWeb3State): Web3Type {
  return state.web3Type;
}

export function selectEthNetwork(state: IWeb3State): EthNetwork {
  return state.ethNetwork;
}

export function selectIsLedgerSelected(state: IWeb3State): boolean {
  return state.web3Type === Web3Type.LEDGER;
}

export function selectEthBrowserWalletSelected(state: IWeb3State): boolean {
  return [Web3Type.GENERIC, Web3Type.METAMASK, Web3Type.MIST, Web3Type.PARITY].some(
    e => e === state.web3Type
  );
}

export function selectNoWalletSelected(state: IWeb3State): boolean {
  return state.web3Type === Web3Type.UNKNOWN;
}
