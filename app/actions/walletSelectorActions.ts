import { ThunkAction } from "redux-thunk";
import { IAppState } from "../reducers/index";
import { INIT_LEDGER_SELECTION } from "./constants";

export const initLedgerSelectionAction = () => ({
  type: INIT_LEDGER_SELECTION,
});

export const initLedgerSelection: ThunkAction<{}, IAppState, {}> = async dispatch => {
  dispatch(initLedgerSelectionAction());
};
