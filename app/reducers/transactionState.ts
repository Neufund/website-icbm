import {
  COMMITTING_DONE,
  COMMITTING_ERROR,
  COMMITTING_NEW_BLOCK,
  COMMITTING_RESET,
  COMMITTING_STARTED,
  COMMITTING_TRANSACTION_MINED,
  COMMITTING_TRANSACTION_SUBMITTED,
} from "../actions/constants";

import { Reducer } from "../types";

export interface ITransactionState {
  txStarted: boolean;
  txHash: string;
  blockOfConfirmation: number;
  blockCurrent: number;
  txConfirmed: boolean;
  error: string;
  generatedNEU: string;
}

const initialState: ITransactionState = {
  txStarted: false,
  txHash: null,
  blockOfConfirmation: null,
  blockCurrent: null,
  txConfirmed: false,
  error: null,
  generatedNEU: null,
};

const reducer: Reducer<ITransactionState> = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case COMMITTING_STARTED:
      return {
        ...state,
        txStarted: true,
      };
    case COMMITTING_TRANSACTION_SUBMITTED:
      return {
        ...state,
        txHash: payload.txHash,
      };
    case COMMITTING_TRANSACTION_MINED:
      return {
        ...state,
        blockOfConfirmation: payload.blockOfConfirmation,
      };
    case COMMITTING_NEW_BLOCK:
      return {
        ...state,
        blockCurrent: payload.currentBlock,
      };
    case COMMITTING_DONE:
      return {
        ...state,
        txConfirmed: true,
      };
    case COMMITTING_RESET:
      return { ...initialState };
    case COMMITTING_ERROR:
      return {
        ...state,
        error: payload.error,
      };
    default:
      return state;
  }
};

export default reducer;
