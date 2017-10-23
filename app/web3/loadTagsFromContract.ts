import * as moment from "moment";

import promiseAll = require("promise-all");
import { etherLock, etherToken, neumark, publicCommitment } from "./contracts/ContractsRepository";
import { convertEurToEth } from "./utils";

export async function loadReservationAgreementGeneralTagsFromContract() {
  const lockInAddress = etherLock.address;
  const euroToEthRate = await publicCommitment.ethEurFraction;

  return {
    lockInAddress,
    ...await promiseAll({
      etherDecimals: etherToken.decimals,
      paymentToken: etherToken.name,
      maxCap: publicCommitment.maxCapEur.then(e => convertEurToEth(euroToEthRate, e)),
      minTicket: publicCommitment.minTicketEur.then(e => convertEurToEth(euroToEthRate, e)),
      unlockFeePercent: etherLock.penaltyFraction,
      feeAddress: etherLock.penaltyDisbursalAddress,
      reservationPeriod: etherLock.lockPeriod,
      signedDate: publicCommitment.currentAgreement().then(r => r[1]),
    }),
  };
}

export async function loadReservationAgreementPersonalTagsFromContract() {
  return promiseAll({
    etherDecimals: etherToken.decimals,
    paymentToken: etherToken.name,
    reservationPeriod: etherLock.lockPeriod
      .then(x => x.toString())
      .then(reservationPeriod => moment.duration(parseInt(reservationPeriod, 10), "seconds")),
    unlockFee: etherLock.penaltyFraction.then(x => x.toString()),
  });
}

export async function loadTokenHolderAgreementGeneralTagsFromContract() {
  return promiseAll({
    signedDate: neumark.currentAgreement().then(r => r[1]),
  });
}
