import * as moment from "moment";

import { etherLock, etherToken, publicCommitment } from "./contracts/ContractsRepository";
import { convertEurToEth } from "./utils";

export async function loadReservationAgreementGeneralTagsFromContract() {
  const lockInAddress = etherLock.address;
  const euroToEthRate = await publicCommitment.ethEurFraction;
  const [
    etherDecimals,
    paymentToken,
    maxCap,
    minTicket,
    unlockFeePercent,
    feeAddress,
    reservationPeriod,
  ] = await Promise.all([
    etherToken.decimals,
    etherToken.name,
    publicCommitment.maxCapEur.then(e => convertEurToEth(euroToEthRate, e)),
    publicCommitment.minTicketEur.then(e => convertEurToEth(euroToEthRate, e)),
    etherLock.penaltyFraction,
    etherLock.penaltyDisbursalAddress,
    etherLock.lockPeriod,
  ]);

  return {
    etherDecimals,
    lockInAddress,
    paymentToken,
    maxCap,
    minTicket,
    unlockFeePercent,
    feeAddress,
    reservationPeriod,
  };
}

export async function loadReservationAgreementPersonalTagsFromContract() {
  const [etherDecimals, paymentToken, reservationPeriod, unlockFee] = await Promise.all([
    etherToken.decimals,
    etherToken.name,
    etherLock.lockPeriod.then(x => x.toString()),
    etherLock.penaltyFraction.then(x => x.toString()),
  ]);

  return {
    etherDecimals,
    unlockFee,
    paymentToken,
    reservationPeriod: moment.duration(parseInt(reservationPeriod, 10), "seconds"),
  };
}
