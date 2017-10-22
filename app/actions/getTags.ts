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
} from "../web3/loadReservationAgreementTagsFromContract";
import { getCurrentBlockHash } from "../web3/utils";

export const getTokenHolderAgreementPersonalTags: ThunkAction<{}, IAppState, {}> = async (
  _dispatcher,
  getState
) => {
  const state = getState();
  const address = state.aftermathState.address;
  const currentBlockHash = await getCurrentBlockHash();

  return {
    "token-holder-address": address,
    "current-block-hash": currentBlockHash,
  };
};

export const getReservationAgreementGeneralTags = async () => {
  const generalTags = await loadReservationAgreementGeneralTagsFromContract();
  const tags: IDictionary = {
    "lockin-sc-address": generalTags.lockInAddress,
    "payment-token": generalTags.paymentToken,
    "max-cap": formatMoney(generalTags.etherDecimals.toNumber(), generalTags.maxCap),
    "min-ticket": formatMoney(generalTags.etherDecimals.toNumber(), generalTags.minTicket),
    "unlock-fee-percent": formatFraction(generalTags.unlockFeePercent),
    "fee-address": generalTags.feeAddress,
    "reservation-period": formatDate(generalTags.reservationPeriod),
  };

  return tags;
};

export const getReservationAgreementTags: ThunkAction<{}, IAppState, {}> = async (
  _dispatcher,
  getState
) => {
  const state = getState();
  const aftermathState = state.aftermathState;

  const generalTags = await getReservationAgreementGeneralTags();
  const partialTags = await loadReservationAgreementPersonalTagsFromContract();
  const currentBlockHash = await getCurrentBlockHash();

  const tags: IDictionary = {
    "investor-address": aftermathState.address,
    "payment-token": partialTags.paymentToken,
    amount: formatMoney(partialTags.etherDecimals.toNumber(), selectLockedAmount(aftermathState)),
    "release-date": formatMomentDate(moment.utc(aftermathState.unlockDate)),
    "reservation-period": partialTags.reservationPeriod.asDays().toString(),
    "reservation-date": formatMomentDate(
      moment.utc(aftermathState.unlockDate).subtract(partialTags.reservationPeriod)
    ),
    "unlock-fee": calculateAndFormatFee(partialTags.unlockFee, aftermathState.lockedAmount),
    "neumark-amount": formatMoney(
      partialTags.etherDecimals.toNumber(),
      selectNeumarkBalance(aftermathState)
    ),
    "neumark-acquisition-ratio": calculateAndFormatRatio(
      aftermathState.lockedAmount,
      aftermathState.neumarkBalance
    ),
    "current-block-hash": currentBlockHash,
    ...generalTags,
  };

  return tags;
};
