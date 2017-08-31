import { combineReducers } from "redux";
import icoParameters, { IcoParametersState } from "./icoParameters";
import icoState, { IcoStateState } from "./icoState";

export interface IAppState {
  readonly icoParameters: IcoParametersState;
  readonly IcoStateState: IcoStateState;
}

export default combineReducers<IAppState>({
  icoParameters,
  icoState,
});
