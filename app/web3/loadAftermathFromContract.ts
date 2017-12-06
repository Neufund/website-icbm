import { etherLock, euroLock, neumark } from "./ContractsRepository";
import { asMomentDate } from "./utils";

export async function loadAftermathFromContract(address: string) {
  const [lockedAmountEth, neumarksGrantedEth, unlockDateEth] = await etherLock.balanceOf(address);
  const [lockedAmountEuro, neumarksGrantedEuro, unlockDateEuro] = await euroLock.balanceOf(address);
  const neumarkBalance = await neumark.balanceOf(address);

  return {
    lockedAmountEth: lockedAmountEth.toString(),
    lockedAmountEuro: lockedAmountEuro.toString(),
    neumarkBalanceEth: neumarksGrantedEth.toString(),
    neumarkBalanceEur: neumarksGrantedEuro.toString(),
    unlockDateEth: asMomentDate(unlockDateEth).toISOString(),
    unlockDateEuro: asMomentDate(unlockDateEuro).toISOString(),
    neumarkBalance: neumarkBalance.toString(),
  };
}
