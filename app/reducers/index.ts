import { combineReducers } from "redux";
import { FormState, reducer as form } from "redux-form";
import aftermathState, { IAftermathState } from "./aftermathState";
import beforeIcoState, { IBeforeIcoState } from "./beforeIcoState";
import commitmentState, { ICommitmentState } from "./commitmentState";
import duringIcoState, { IDuringIcoState } from "./duringIcoState";
import ledgerAddressChooserState, { ILedgerAddressChooser } from "./ledgerAddressChooserState";
import legalAgreementState, { ILegalAgreementState } from "./legalAgreementState";
import transactionState, { ITransactionState } from "./transactionState";
import userState, { IUserState } from "./userState";
import walletIntegrationState, { IWalletIntegrationState } from "./walletIntegrationState";
import web3State, { IWeb3State } from "./web3State";

export interface IAppState {
  readonly commitmentState: ICommitmentState;
  readonly beforeIcoState: IBeforeIcoState;
  readonly duringIcoState: IDuringIcoState;
  readonly form: { [formName: string]: FormState };
  readonly userState: IUserState;
  readonly legalAgreementState: ILegalAgreementState;
  readonly aftermathState: IAftermathState;
  readonly transactionState: ITransactionState;
  readonly web3State: IWeb3State;
  readonly walletIntegrationState: IWalletIntegrationState;
  readonly ledgerAddressChooserState: ILedgerAddressChooser;
}

export default combineReducers<IAppState>({
  commitmentState,
  form,
  userState,
  legalAgreementState,
  beforeIcoState,
  duringIcoState,
  aftermathState,
  transactionState,
  web3State,
  walletIntegrationState,
  ledgerAddressChooserState,
});
