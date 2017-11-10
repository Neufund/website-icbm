import { BigNumber } from "bignumber.js";
import * as moment from "moment";
import { ThunkAction } from "redux-thunk";

import {
  calculateAndFormatFee,
  calculateAndFormatRatio,
  formatDate,
  formatFraction,
  formatMomentDate,
  formatMoney,
} from "../agreements/utils";
import { selectLockedAmount, selectNeumarkBalance } from "../reducers/aftermathState";
import { IAppState } from "../reducers/index";
import { IDictionary } from "../types";
import {
  loadReservationAgreementGeneralTagsFromContract,
  loadReservationAgreementPersonalTagsFromContract,
  loadTokenHolderAgreementGeneralTagsFromContract,
} from "../web3/loadTagsFromContract";
import { getCurrentBlockHash } from "../web3/utils";

export const getTokenHolderAgreementGeneralTags = async () => {
  const generalTags = await loadTokenHolderAgreementGeneralTagsFromContract();
  const tags: IDictionary = {
    "signed-by-company-date": formatDate(generalTags.signedDate),
  };

  return tags;
};

export const getTokenHolderAgreementTags: ThunkAction<{}, IAppState, {}> = async (
  _dispatcher,
  getState
) => {
  const state = getState();
  const address = state.aftermathState.address;
  const currentBlockHash = await getCurrentBlockHash();

  const generalTags = await getTokenHolderAgreementGeneralTags();

  return {
    "token-holder-address": address,
    "current-block-hash": currentBlockHash,
    ...generalTags,
  };
};

export const getReservationAgreementGeneralTags = async (ethEurFraction: BigNumber) => {
  const generalTags = await loadReservationAgreementGeneralTagsFromContract(ethEurFraction);
  const tags: IDictionary = {
    "lockin-sc-address": generalTags.lockInAddress,
    "payment-token": generalTags.paymentToken,
    "max-cap": formatMoney(generalTags.etherDecimals.toNumber(), generalTags.maxCap),
    "min-ticket": formatMoney(generalTags.etherDecimals.toNumber(), generalTags.minTicket),
    "unlock-fee-percent": formatFraction(generalTags.unlockFeePercent),
    "fee-address": generalTags.feeAddress,
    "reservation-period": formatDate(generalTags.reservationPeriod),
    "signed-by-company-date": formatDate(generalTags.signedDate),
  };

  return tags;
};

export const getReservationAgreementTags: ThunkAction<{}, IAppState, {}> = async (
  _dispatcher,
  getState
) => {
  const state = getState();
  const ethEurFraction = new BigNumber(state.commitmentState.ethEurFraction);
  const aftermathState = state.aftermathState;

  const generalTags = await getReservationAgreementGeneralTags(ethEurFraction);
  const partialTags = await loadReservationAgreementPersonalTagsFromContract();
  const currentBlockHash = await getCurrentBlockHash();

  const tags: IDictionary = {
    "investor-address": aftermathState.address,
    "payment-token": partialTags.paymentToken,
    amount: formatMoney(partialTags.etherDecimals.toNumber(), selectLockedAmount(aftermathState)),
    "release-date": formatMomentDate(moment.utc(aftermathState.unlockDateEth)),
    "reservation-period": partialTags.reservationPeriod.asDays().toString(),
    "reservation-date": formatMomentDate(
      moment.utc(aftermathState.unlockDateEth).subtract(partialTags.reservationPeriod)
    ),
    "unlock-fee": calculateAndFormatFee(partialTags.unlockFee, aftermathState.lockedAmountEth),
    "neumark-amount": formatMoney(
      partialTags.etherDecimals.toNumber(),
      selectNeumarkBalance(aftermathState)
    ),
    "neumark-acquisition-ratio": calculateAndFormatRatio(
      aftermathState.lockedAmountEth,
      aftermathState.neumarkBalanceEth
    ),
    "current-block-hash": currentBlockHash,
    ...generalTags,
  };

  return tags;
};
