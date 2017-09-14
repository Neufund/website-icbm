import { combineReducers } from "redux";
import { FormState, reducer as form } from "redux-form";
import icoState, { IcoState } from "./icoState";
import userState, { IUserState } from "./userState";

export interface IAppState {
  readonly icoState: IcoState;
  readonly form: FormState;
  readonly userState: IUserState;
}

export default combineReducers<IAppState>({
  icoState,
  form,
  userState,
});
