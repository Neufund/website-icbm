import { BigNumber } from "bignumber.js";
import * as invariant from "invariant";
import * as moment from "moment";

import promiseAll = require("promise-all");
import { TokenType } from "../actions/constants";
import {
  etherLock,
  etherToken,
  euroLock,
  euroToken,
  neumark,
  publicCommitment,
} from "./contracts/ContractsRepository";
import { convertEurToEth } from "./utils";

export async function loadReservationAgreementGeneralTagsFromContract(
  tokenType: TokenType,
  ethEurFraction: BigNumber
) {
  invariant(
    tokenType === TokenType.ETHER || tokenType === TokenType.EURO,
    "Mismatched token type!"
  );

  const tokenContract = tokenType === TokenType.ETHER ? etherToken : euroToken;
  const lockContract = tokenType === TokenType.ETHER ? etherLock : euroLock;

  const lockInAddress = lockContract.address;

  return {
    lockInAddress,
    ...await promiseAll({
      decimals: tokenContract.decimals,
      paymentToken: tokenContract.name,
      maxCap: publicCommitment.maxCapEur.then(
        e => (tokenType === TokenType.ETHER ? convertEurToEth(ethEurFraction, e) : e)
      ),
      minTicket: publicCommitment.minTicketEur.then(
        e => (tokenType === TokenType.ETHER ? convertEurToEth(ethEurFraction, e) : e)
      ),
      unlockFeePercent: lockContract.penaltyFraction,
      feeAddress: lockContract.penaltyDisbursalAddress,
      reservationPeriod: lockContract.lockPeriod,
      signedDate: publicCommitment.currentAgreement().then(r => r[1]),
    }),
  };
}

export async function loadReservationAgreementPersonalTagsFromContract(tokenType: TokenType) {
  const lockContract = tokenType === TokenType.ETHER ? etherLock : euroLock;
  const tokenContract = tokenType === TokenType.ETHER ? etherToken : euroToken;

  return promiseAll({
    decimals: tokenContract.decimals,
    reservationPeriodDuration: lockContract.lockPeriod
      .then(x => x.toString())
      .then(reservationPeriod => moment.duration(parseInt(reservationPeriod, 10), "seconds")),
    unlockFee: lockContract.penaltyFraction.then(x => x.toString()),
  });
}

export async function loadTokenHolderAgreementGeneralTagsFromContract() {
  return promiseAll({
    signedDate: neumark.currentAgreement().then(r => r[1]),
  });
}
