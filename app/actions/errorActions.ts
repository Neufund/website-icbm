import { IStandardReduxAction } from "../types";
import { ERROR_SET } from "./constants";

export const setErrorActionCreator = (errorMsg: string): IStandardReduxAction => ({
  type: ERROR_SET,
  payload: {
    error: errorMsg,
  },
});
