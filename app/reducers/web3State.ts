import { SET_DERIVATION_PATH, SET_WEB3_TYPE, Web3Type } from "../actions/constants";
import { Reducer } from "../types";

export interface IWeb3State {
  web3Type: Web3Type;
  derivationPath: string;
}

const initialState: IWeb3State = {
  web3Type: null,
  derivationPath: null,
};

const reducer: Reducer<IWeb3State> = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_WEB3_TYPE:
      return {
        ...state,
        web3Type: payload.web3Type,
      };
    case SET_DERIVATION_PATH:
      return {
        ...state,
        derivationPath: payload.derivationPath,
      };
    default:
      return state;
  }
};

export default reducer;

export function selectWeb3Type(state: IWeb3State): Web3Type {
  return state.web3Type;
}

export function selectDerivationPath(state: IWeb3State): string {
  return state.derivationPath;
}
