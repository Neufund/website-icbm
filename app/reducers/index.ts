import { combineReducers } from "redux";
import { FormState, reducer as form } from "redux-form";
import beforeIcoState, { IBeforeIcoState } from "./beforeIcoState";
import commitmentState, { ICommitmentState } from "./commitmentState";
import legalAgreementState, { ILegalAgreementState } from "./legalAgreementState";
import userState, { IUserState } from "./userState";

export interface IAppState {
  readonly commitmentState: ICommitmentState;
  readonly beforeIcoState: IBeforeIcoState;
  readonly form: FormState;
  readonly userState: IUserState;
  readonly legalAgreementState: ILegalAgreementState;
}

export default combineReducers<IAppState>({
  commitmentState,
  form,
  userState,
  legalAgreementState,
  beforeIcoState,
});
