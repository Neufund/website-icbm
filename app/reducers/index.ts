import { combineReducers } from "redux";
import icoState, { IcoState } from "./icoState";

export interface IAppState {
  readonly icoState: IcoState;
}

export default combineReducers<IAppState>({
  icoState,
});
