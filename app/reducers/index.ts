import { combineReducers } from "redux";
import { FormState, reducer as form } from "redux-form";
import beforeIcoState, { IBeforeIcoState } from "./beforeIcoState";
import commitmentState, { ICommitmentState } from "./commitmentState";
import duringIcoState, { IDuringIcoState } from "./duringIcoState";
import legalAgreementState, { ILegalAgreementState } from "./legalAgreementState";
import transactionState, { ITransactionState } from "./transactionState";
import userState, { IUserState } from "./userState";

export interface IAppState {
  readonly commitmentState: ICommitmentState;
  readonly beforeIcoState: IBeforeIcoState;
  readonly duringIcoState: IDuringIcoState;
  readonly form: FormState;
  readonly userState: IUserState;
  readonly legalAgreementState: ILegalAgreementState;
  readonly transactionState: ITransactionState;
}

export default combineReducers<IAppState>({
  commitmentState,
  form,
  userState,
  legalAgreementState,
  beforeIcoState,
  duringIcoState,
  transactionState,
});
