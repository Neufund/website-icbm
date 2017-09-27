import { ThunkAction } from "redux-thunk";
import { selectMinTicketWei } from "../reducers/commitmentState";
import { IAppState } from "../reducers/index";
import { IStandardReduxAction } from "../types";
import { commitmentValueValidator } from "../validators/commitmentValueValidator";
import { estimateNeumarksRewardFromContract } from "../web3/estimateNeumarksRewardFromContract";
import { submitFundsToContract } from "../web3/submitFundsToContract";
import { transactionConfirmation } from "../web3/transactionConfirmation";
import {
  COMMITTING_DONE,
  COMMITTING_ERROR,
  COMMITTING_NEW_BLOCK,
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

export const transactionStartedAction = (): IStandardReduxAction => ({
  type: COMMITTING_STARTED,
  payload: {},
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
    const selectedAccount = getState().userState.selectedAddress;
    dispatcher(transactionStartedAction());
    const txHash = await submitFundsToContract(value, selectedAccount);
    dispatcher(transactionSubmitted(txHash));

    const transactionMined = (blockNo: number) => {
      dispatcher(transactionMinedAction(blockNo));
    };

    const newBlock = (blockNo: number) => {
      dispatcher(transactionNewBlockAction(blockNo));
    };

    await transactionConfirmation(txHash, transactionMined, newBlock);
    dispatcher(transactionDoneAction());
    window.location.assign("/");
  } catch (e) {
    dispatcher(transactionErrorAction(e.toString()));
  }
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
    dispatcher(setEstimatedRewardAction("0"));
    return;
  }

  dispatcher(loadingEstimatedRewardAction());

  const estimatedNeumarksReward = await estimateNeumarksRewardFromContract(ethAmountInput);

  dispatcher(setEstimatedRewardAction(estimatedNeumarksReward.toString()));
};
