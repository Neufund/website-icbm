import { BigNumber } from "bignumber.js";
import { publicCommitment } from "./contracts/ContractsRepository";
import { asWeiNumber } from "./utils";

export async function estimateNeumarksRewardFromContract(
  ethAmountInput: string
): Promise<BigNumber> {
  const weiAmount = asWeiNumber(ethAmountInput) as any; // @todo fix

  const neumarks = await publicCommitment.estimateNeumarkReward(weiAmount);

  return neumarks; // @todo this assumes that ether and neumarks have the same decimals
}
