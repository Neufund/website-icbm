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
import { IAppState } from "../reducers/index";
import { IDictionary } from "../types";
import {
  loadReservationAgreementGeneralTagsFromContract,
  loadReservationAgreementPersonalTagsFromContract,
  loadTokenHolderAgreementGeneralTagsFromContract,
} from "../web3/loadTagsFromContract";
import { getCurrentBlockHash } from "../web3/utils";
import { TokenType } from "./constants";

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

export const getReservationAgreementGeneralTags = async (
  tokenType: TokenType,
  ethEurFraction: BigNumber
) => {
  const generalTags = await loadReservationAgreementGeneralTagsFromContract(
    tokenType,
    ethEurFraction
  );
  const tags: IDictionary = {
    "lockin-sc-address": generalTags.lockInAddress,
    "payment-token": generalTags.paymentToken,
    "max-cap": formatMoney(generalTags.decimals.toNumber(), generalTags.maxCap),
    "min-ticket": formatMoney(generalTags.decimals.toNumber(), generalTags.minTicket),
    "unlock-fee-percent": formatFraction(generalTags.unlockFeePercent),
    "fee-address": generalTags.feeAddress,
    "reservation-period": moment
      .duration(generalTags.reservationPeriod.toNumber(), "seconds")
      .asDays()
      .toString(),
    "signed-by-company-date": formatDate(generalTags.signedDate),
  };

  return tags;
};

export const getReservationAgreementTags: (
  tokenType: TokenType
) => ThunkAction<{}, IAppState, {}> = tokenType => async (_dispatcher, getState) => {
  const state = getState();
  const ethEurFraction = new BigNumber(state.commitmentState.ethEurFraction);
  const aftermathState = state.aftermathState;

  const generalTags = await getReservationAgreementGeneralTags(tokenType, ethEurFraction);
  const personalTags = await loadReservationAgreementPersonalTagsFromContract(tokenType);
  const currentBlockHash = await getCurrentBlockHash();

  const lockedAmount =
    tokenType === TokenType.ETHER
      ? state.aftermathState.lockedAmountEth
      : state.aftermathState.lockedAmountEur;
  const neumarkBalance =
    tokenType === TokenType.ETHER
      ? state.aftermathState.neumarkBalanceEth
      : state.aftermathState.neumarkBalanceEur;
  const unlockDate =
    tokenType === TokenType.ETHER
      ? state.aftermathState.unlockDateEth
      : state.aftermathState.unlockDateEur;

  const tags: IDictionary = {
    "investor-address": aftermathState.address,
    amount: formatMoney(personalTags.decimals.toNumber(), lockedAmount),
    "release-date": formatMomentDate(moment.utc(unlockDate)),
    "reservation-date": formatMomentDate(
      moment.utc(unlockDate).subtract(personalTags.reservationPeriodDuration)
    ),
    "unlock-fee": calculateAndFormatFee(personalTags.unlockFee, lockedAmount),
    "neumark-amount": formatMoney(personalTags.decimals.toNumber(), neumarkBalance),
    "neumark-acquisition-ratio": calculateAndFormatRatio(lockedAmount, neumarkBalance),
    "current-block-hash": currentBlockHash,
    ...generalTags,
  };

  return tags;
};
