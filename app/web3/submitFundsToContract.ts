import config from "../config";
import { publicCommitment } from "./contracts/ContractsRepository";
import { web3Instance as web3Provider } from "./web3Provider";

export async function submitFundsToContract(
  valueInEth: string,
  fromAccount: string
): Promise<string> {
  const valueInWei = web3Provider.toWei(valueInEth, "ether");
  return publicCommitment.commitTx({
    from: fromAccount,
    gas: config.contractsDeployed.gasLimit,
    gasPrice: config.contractsDeployed.gasPrice,
    value: valueInWei,
  });
}
