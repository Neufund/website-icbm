import { BigNumber } from "bignumber.js";
import { publicCommitment } from "./contracts/ContractsRepository";
import { asEtherNumber, asWeiNumber } from "./utils";

export async function estimateNeumarksRewardFromContract(
  ethAmountInput: string
): Promise<BigNumber> {
  const weiAmount = asWeiNumber(ethAmountInput) as any; // @todo fix

  const neumarks = await publicCommitment.estimateNeumarkReward(weiAmount);

  return asEtherNumber(neumarks); // @todo this assumes that ether and neumarks have the same decimals
}
