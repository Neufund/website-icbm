import * as invariant from "invariant";

import config from "../config";
import { publicCommitment } from "./ContractsRepository";
import { asWeiNumber } from "./utils";
import { Web3Service } from "./web3Service";

export async function submitFundsToContract(
  valueInEth: string,
  fromAccount: string
): Promise<string> {
  const valueInWei = asWeiNumber(valueInEth);

  invariant(Web3Service.instance.hasPersonalWeb3(), "Can't find personal web3 instance!");

  // we use personal web3 to commit tx but we check confirmations using our nodes
  return publicCommitment.commitTx().send(
    {
      from: fromAccount,
      gas: config.contractsDeployed.gasLimit,
      gasPrice: config.contractsDeployed.gasPrice,
      value: valueInWei,
    },
    Web3Service.instance.personalWeb3
  );
}
