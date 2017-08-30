import { Crowdsale } from "./contracts";
import { asEtherNumber, asNumber } from "./utils";

export async function loadIcoStats(CrowdsaleAddress: string) {
  const lockedAccount = Crowdsale(CrowdsaleAddress);

  // const [startDate] = await Promise.all([lockedAccount.startDate().then(asNumber)]);
  const [startDate] = await Promise.all([1]);

  return {
    Icostart: startDate,
    neuMarkToEtherRatio: 1000000,
  };
}
