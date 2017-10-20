import { BigNumber } from "bignumber.js";
import * as moment from "moment";
import { ThunkAction } from "redux-thunk";
import { IAppState } from "../reducers/index";
import { IDictionary } from "../types";
import { loadReservationAgreementTagsFromContract } from "../web3/loadReservationAgreementTagsFromContract";

export const getTokenHolderAgreementTags: ThunkAction<{}, IAppState, {}> = async (
  _dispatcher,
  getState
) => {
  const state = getState();
  const address = state.aftermathState.address;

  return {
    "token-holder-address": address,
  };
};

function formatDate(date: moment.Moment): string {
  return date.format("YYYY-MM-DD hh:mm") + " UTC";
}

// tokens in ETH or NEU
// returns value in base currency (ETH/NEU) with two decimal places
function formatMoney(tokens: string): string {
  return new BigNumber(tokens).toFixed(2);
}

function calculateAndFormatRatio(amount: string, neumarkBalance: string): string {
  return new BigNumber(amount).div(new BigNumber(neumarkBalance)).toFixed(3);
}

// returns wei
function calculateAndFormatFee(penaltyFraction: string, amount: string): string {
  return new BigNumber(penaltyFraction)
    .mul(new BigNumber(amount).mul(new BigNumber(10).pow(18)))
    .div(new BigNumber(10).pow(18))
    .toString();
}

export const getReservationAgreementTags: ThunkAction<{}, IAppState, {}> = async (
  _dispatcher,
  getState
) => {
  // @todo standardize formatting for money. Should it be wei?
  const state = getState();
  const aftermathState = state.aftermathState;

  const partialTags = await loadReservationAgreementTagsFromContract();

  const tags: IDictionary = {
    "investor-address": aftermathState.address,
    "payment-token": partialTags.paymentToken,
    amount: formatMoney(aftermathState.lockedAmount),
    "release-date": formatDate(moment.utc(aftermathState.unlockDate)),
    "reservation-period": partialTags.reservationPeriod.asDays().toString(),
    "reservation-date": formatDate(
      moment.utc(aftermathState.unlockDate).subtract(partialTags.reservationPeriod)
    ),
    "unlock-fee": calculateAndFormatFee(partialTags.unlockFee, aftermathState.lockedAmount),
    "neumark-amount": formatMoney(aftermathState.neumarkBalance),
    "neumark-acquisition-ratio": calculateAndFormatRatio(
      aftermathState.lockedAmount,
      aftermathState.neumarkBalance
    ),
  };

  return tags;
};
