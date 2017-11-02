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
  blockHistory: Array<{ blockNo: number; confirmedTx: boolean }>;
  txConfirmed: boolean;
  error: string;
}

const initialState: ITransactionState = {
  txStarted: false,
  txHash: null,
  blockOfConfirmation: null,
  blockHistory: [],
  txConfirmed: false,
  error: null,
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
      const blockHistory = Array.from(state.blockHistory);
      blockHistory.unshift({
        blockNo: payload.currentBlock,
        confirmedTx: payload.confirmedTx,
      });
      return {
        ...state,
        blockHistory,
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
