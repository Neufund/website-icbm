import { etherLock } from "./contracts/ContractsRepository";
import { asEtherNumber, asMomentDate } from "./utils";

export async function loadAftermathFromContract(address: string) {
  const [lockedAmount, neumarksGranted, unlockDate] = await etherLock.balanceOf(address);

  return {
    lockedAmount: asEtherNumber(lockedAmount).toString(),
    neumarkBalance: asEtherNumber(neumarksGranted).toString(),
    unlockDate: asMomentDate(unlockDate).toISOString(),
  };
}
