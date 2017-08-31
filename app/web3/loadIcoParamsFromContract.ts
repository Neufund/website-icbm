import { Crowdsale } from "./contracts";
import { asEtherNumber, asMomentDate } from "./utils";

export async function loadIcoParamsFromContract(address: string) {
  const icoContract = Crowdsale(address);
  const [minCap, maxCap, startDate, endDate] = await Promise.all([
    icoContract.minAbsCapAsync().then(asEtherNumber),
    icoContract.maxAbsCapAsync().then(asEtherNumber),
    icoContract.startDateAsync().then(asMomentDate),
    icoContract.endDateAsync().then(asMomentDate),
  ]);

  return {
    minCap,
    maxCap,
    startDate,
    endDate,
  };
}
export default loadIcoParamsFromContract;
