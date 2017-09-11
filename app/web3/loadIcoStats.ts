import { Crowdsale } from "./contracts";
import { asNumber } from "./utils";

export async function loadIcoStats() {
  const lockedAccount = Crowdsale();

  const [startDate] = await Promise.all([lockedAccount.startDateAsync().then(asNumber)]);

  return {
    Icostart: startDate,
    neuMarkToEtherRatio: 1000000,
  };
}
