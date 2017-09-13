import { combineReducers } from "redux";
import { FormState, reducer as form } from "redux-form";
import icoState, { IcoState } from "./icoState";

export interface IAppState {
  readonly icoState: IcoState;
  readonly form: FormState;
}

export default combineReducers<IAppState>({
  icoState,
  form,
});
