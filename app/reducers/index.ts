import { combineReducers } from "redux";
import { reducer as form } from "redux-form";
import icoState, { IcoState } from "./icoState";

export interface IAppState {
  readonly icoState: IcoState;
  readonly form: any;
}

export default combineReducers<IAppState>({
  icoState,
  form,
});
