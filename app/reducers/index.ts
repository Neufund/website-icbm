import { combineReducers } from "redux";
import icoParameters, { IcoParametersState } from "./icoParameters";

export interface IAppState {
  readonly icoParameters: IcoParametersState;
}

export default combineReducers<IAppState>({
  icoParameters,
});
