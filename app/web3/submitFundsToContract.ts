import config from "../config";
import { publicCommitment } from "./contracts/ContractsRepository";
import { asWeiNumber } from "./utils";

export async function submitFundsToContract(
  valueInEth: string,
  fromAccount: string
): Promise<string> {
  const valueInWei = asWeiNumber(valueInEth);
  // @todo rewrite it! to tx sigining! and sending
  return publicCommitment.commitTx({
    from: fromAccount,
    gas: config.contractsDeployed.gasLimit,
    gasPrice: config.contractsDeployed.gasPrice,
    value: valueInWei,
  });
}
