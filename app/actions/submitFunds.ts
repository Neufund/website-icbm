import * as BigNumber from "bignumber.js";
import { push } from "react-router-redux";
import { ThunkAction } from "redux-thunk";

import { ErrorType } from "../errors";
import { selectMinTicketWei } from "../reducers/commitmentState";
import { IAppState } from "../reducers/index";
import { selectReservedNeumarks, selectReservedTicket } from "../reducers/userState";
import { IStandardReduxAction } from "../types";
import { parseMoneyStrToStrStrict } from "../utils/utils";
import { commitmentValueValidator } from "../validators/commitmentValueValidator";
import { estimateNeumarksRewardFromContract } from "../web3/estimateNeumarksRewardFromContract";
import { submitFundsToContract } from "../web3/submitFundsToContract";
import { transactionConfirmation } from "../web3/transactionConfirmation";
import { asWeiNumber } from "../web3/utils";
import { web3ErrorHandler } from "../web3/web3ErrorHandler";
import { Web3Service } from "../web3/web3Service";
import {
  COMMITTING_DONE,
  COMMITTING_ERROR,
  COMMITTING_NEW_BLOCK,
  COMMITTING_RESET,
  COMMITTING_SET_AMOUNT_TOKENS,
  COMMITTING_STARTED,
  COMMITTING_TRANSACTION_MINED,
  COMMITTING_TRANSACTION_SUBMITTED,
  LOAD_ESTIMATED_REWARD,
  SET_ESTIMATED_REWARD,
} from "./constants";

export const loadingEstimatedRewardAction: () => IStandardReduxAction = () => ({
  type: LOAD_ESTIMATED_REWARD,
  payload: {},
});

export function setEstimatedRewardAction(estimatedReward: string): IStandardReduxAction {
  return {
    type: SET_ESTIMATED_REWARD,
    payload: { estimatedReward },
  };
}

export const transactionResetAction = (): IStandardReduxAction => ({
  type: COMMITTING_RESET,
  payload: {},
});

export const transactionStartedAction = (): IStandardReduxAction => ({
  type: COMMITTING_STARTED,
  payload: {},
});

export const transactionSetTokenAmounts = (
  committedETH: string,
  estimatedNEU: string
): IStandardReduxAction => ({
  type: COMMITTING_SET_AMOUNT_TOKENS,
  payload: {
    committedETH,
    estimatedNEU,
  },
});

export const transactionSubmitted = (txHash: string): IStandardReduxAction => ({
  type: COMMITTING_TRANSACTION_SUBMITTED,
  payload: { txHash },
});

export const transactionMinedAction = (blockNo: number): IStandardReduxAction => ({
  type: COMMITTING_TRANSACTION_MINED,
  payload: {
    blockOfConfirmation: blockNo,
  },
});

export const transactionNewBlockAction = (blockNo: number): IStandardReduxAction => ({
  type: COMMITTING_NEW_BLOCK,
  payload: {
    currentBlock: blockNo,
  },
});

export const transactionDoneAction = (): IStandardReduxAction => ({
  type: COMMITTING_DONE,
  payload: {},
});

export const transactionErrorAction = (error: string): IStandardReduxAction => ({
  type: COMMITTING_ERROR,
  payload: { error },
});

export const submitFunds: (value: string) => ThunkAction<{}, IAppState, {}> = value => async (
  dispatcher,
  getState
) => {
  try {
    const state = getState();

    const parsedValue = parseMoneyStrToStrStrict(value);

    const committedETH = Web3Service.instance.rawWeb3
      .toWei(new BigNumber.BigNumber(parsedValue), "ether")
      .toString();
    const estimatedReward = state.commitmentState.estimatedReward;

    dispatcher(transactionSetTokenAmounts(committedETH, estimatedReward));
    const selectedAccount = state.userState.address;
    dispatcher(push("/commit/tx-confirmation"));

    dispatcher(transactionStartedAction());
    const txHash = await submitFundsToContract(parsedValue, selectedAccount);
    dispatcher(push(`/commit/tx-status/${txHash}`));
  } catch (e) {
    const parsedError = web3ErrorHandler(e);
    if (parsedError.type === ErrorType.UnknownError) {
      // tslint:disable-next-line no-console
      console.log(e);
    }

    if (parsedError.type === ErrorType.UserDeniedTransaction) {
      dispatcher(push("/commit"));
      dispatcher(transactionResetAction());
      dispatcher(setEstimatedRewardAction(new BigNumber.BigNumber(0).toString()));
      return;
    }

    dispatcher(transactionErrorAction(parsedError.message));
  }
};

export const watchTxBeingMined: (
  txHash: string
) => ThunkAction<{}, IAppState, {}> = txHash => async dispatcher => {
  const transactionMined = (blockNo: number) => {
    dispatcher(transactionMinedAction(blockNo));
  };

  const newBlock = (blockNo: number) => {
    dispatcher(transactionNewBlockAction(blockNo));
  };

  try {
    await transactionConfirmation(txHash, transactionMined, newBlock);
  } catch (e) {
    const parsedError = web3ErrorHandler(e);
    if (parsedError.type === ErrorType.UnknownError) {
      // tslint:disable-next-line no-console
      console.log(e);
    }
    dispatcher(transactionErrorAction(parsedError.message));
    return;
  }
  dispatcher(transactionDoneAction());
};

export const calculateEstimatedReward: ThunkAction<{}, IAppState, {}> = async (
  dispatcher,
  getState
) => {
  const state = getState();
  const formValues = state.form.commitFunds.values;
  const ethAmountInput = formValues ? formValues.ethAmount : "0";
  const minTicketWei = selectMinTicketWei(state.commitmentState);

  // we need to make sure first if the form is valid :( This should be done automatically and this action creator should be called on something like onValidationSucceed but there it no such method
  if (commitmentValueValidator(ethAmountInput, {}, { minTicketWei }) !== undefined) {
    return dispatcher(setEstimatedRewardAction("0"));
  }
  const parsedEthAmountInputInWei = new BigNumber.BigNumber(
    asWeiNumber(parseMoneyStrToStrStrict(ethAmountInput))
  );

  dispatcher(loadingEstimatedRewardAction());

  const estimatedNeumarksReward = await estimateNeumarksRewardFromContract(
    parsedEthAmountInputInWei,
    selectReservedTicket(state.userState),
    selectReservedNeumarks(state.userState)
  );

  dispatcher(setEstimatedRewardAction(estimatedNeumarksReward.toString()));
};
