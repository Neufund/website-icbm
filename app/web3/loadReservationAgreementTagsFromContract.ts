import * as moment from "moment";

import { etherLock, etherToken } from "./contracts/ContractsRepository";

export async function loadReservationAgreementTagsFromContract() {
  const [paymentToken, reservationPeriod, unlockFee] = await Promise.all([
    etherToken.name,
    etherLock.lockPeriod.then(x => x.toString()),
    etherLock.penaltyFraction.then(x => x.toString()),
  ]);

  return {
    unlockFee,
    paymentToken,
    reservationPeriod: moment.duration(parseInt(reservationPeriod, 10), "seconds"),
  };
}
