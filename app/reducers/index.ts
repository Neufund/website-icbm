import { combineReducers } from "redux";
import { FormState, reducer as form } from "redux-form";
import aftermathState, { IAftermathState } from "./aftermathState";
import beforeIcoState, { IBeforeIcoState } from "./beforeIcoState";
import commitmentState, { ICommitmentState } from "./commitmentState";
import duringIcoState, { IDuringIcoState } from "./duringIcoState";
import legalAgreementState, { ILegalAgreementState } from "./legalAgreementState";
import userState, { IUserState } from "./userState";

export interface IAppState {
  readonly commitmentState: ICommitmentState;
  readonly beforeIcoState: IBeforeIcoState;
  readonly duringIcoState: IDuringIcoState;
  readonly form: { [formName: string]: FormState };
  readonly userState: IUserState;
  readonly legalAgreementState: ILegalAgreementState;
  readonly aftermathState: IAftermathState;
}

export default combineReducers<IAppState>({
  commitmentState,
  form,
  userState,
  legalAgreementState,
  beforeIcoState,
  duringIcoState,
  aftermathState,
});
