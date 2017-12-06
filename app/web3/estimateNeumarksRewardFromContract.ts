import { BigNumber } from "bignumber.js";
import { publicCommitment } from "./ContractsRepository";

export async function estimateNeumarksRewardFromContract(
  etherWei: BigNumber,
  reservedTicket: BigNumber,
  reservedNeumarks: BigNumber
): Promise<BigNumber> {
  let neumarkProportionReward = new BigNumber(0);
  let curveNeumarks = new BigNumber(0);
  let curvePart = etherWei;

  if (reservedTicket.gt(new BigNumber(0))) {
    const proportionPart = BigNumber.min(reservedTicket, etherWei);
    neumarkProportionReward = proportionPart
      .div(reservedTicket)
      .mul(reservedNeumarks)
      .round(0, BigNumber.ROUND_HALF_UP);
    curvePart = curvePart.sub(proportionPart);
  }

  if (curvePart.gt(0)) {
    curveNeumarks = await publicCommitment.estimateNeumarkReward(curvePart.toString());
  }

  return neumarkProportionReward.add(curveNeumarks);
}
