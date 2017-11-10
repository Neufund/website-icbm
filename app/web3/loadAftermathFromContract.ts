import { etherLock, euroLock } from "./contracts/ContractsRepository";
import { asEtherNumber, asMomentDate } from "./utils";

export async function loadAftermathFromContract(address: string) {
  const [lockedAmountEth, neumarksGrantedEth, unlockDateEth] = await etherLock.balanceOf(address);
  const [lockedAmountEuro, neumarksGrantedEuro, unlockDateEuro] = await euroLock.balanceOf(address);

  return {
    lockedAmountEth: lockedAmountEth.toString(),
    lockedAmountEuro: lockedAmountEuro.toString(),
    neumarkBalance: neumarksGrantedEth.add(neumarksGrantedEuro).toString(),
    unlockDateEth: asMomentDate(unlockDateEth).toISOString(),
    unlockDateEuro: asMomentDate(unlockDateEuro).toISOString(),
  };
}
