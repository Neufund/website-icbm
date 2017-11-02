import { IStandardReduxAction } from "../types";
import { SET_FATAL_ERROR } from "./constants";

export const setFatalErrorActionCreator = (errorMsg: string): IStandardReduxAction => ({
  type: SET_FATAL_ERROR,
  payload: {
    fatalError: errorMsg,
  },
});
