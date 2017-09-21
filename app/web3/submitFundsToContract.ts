import { publicCommitment } from "./contracts/ContractsRepository";
import web3Provider from "./web3Provider";

export async function submitFundsToContract(valueInEth: string, fromAccount: string) {
  const valueInWei = web3Provider.toWei(valueInEth, "ether");
  await publicCommitment.commitTx({ from: fromAccount, gas: 2000000, value: valueInWei });
}
