import { Crowdsale } from "./contracts";
import { asNumber } from "./utils";

export async function loadIcoStats(CrowdsaleAddress: string) {
  const lockedAccount = Crowdsale(CrowdsaleAddress);

  const [startDate] = await Promise.all([lockedAccount.startDateAsync().then(asNumber)]);

  return {
    Icostart: startDate,
    neuMarkToEtherRatio: 1000000,
  };
}
