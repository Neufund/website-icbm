import { ThunkAction } from "redux-thunk";
import { selectMinTicketWei } from "../reducers/commitmentState";
import { IAppState } from "../reducers/index";
import { IStandardReduxAction } from "../types";
import { commitmentValueValidator } from "../validators/commitmentValueValidator";
import { estimateNeumarksRewardFromContract } from "../web3/estimateNeumarksRewardFromContract";
import { submitFundsToContract } from "../web3/submitFundsToContract";
import { LOAD_ESTIMATED_REWARD, SET_ESTIMATED_REWARD } from "./constants";

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

export const submitFunds: (value: string) => ThunkAction<{}, IAppState, {}> = value => async (
  _dispatcher,
  getState
) => {
  try {
    const selectedAccount = getState().userState.selectedAddress;
    await submitFundsToContract(value, selectedAccount);
  } catch (e) {
    // tslint:disable-next-line
    console.log("ERROR", e);
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
