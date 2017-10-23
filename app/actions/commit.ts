import { ThunkAction } from "redux-thunk";
import { IAppState } from "../reducers/index";
import { loadAgreements } from "./legalAgreement";
import { loadIcoParams } from "./loadIcoParams";
import { loadUserAccount, setLoadingAction } from "./loadUserAccount";

export const initCommit: ThunkAction<{}, IAppState, {}> = async (dispatch, getState) => {
  await dispatch(loadIcoParams);
  await dispatch(loadAgreements);
  await dispatch(loadUserAccount);

  // this can happen if no user can be loaded
  if (getState().userState.loading) {
    await dispatch(setLoadingAction(false));
  }
};
