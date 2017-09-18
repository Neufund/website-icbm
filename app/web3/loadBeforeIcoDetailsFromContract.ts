import { publicCommitment } from "./contracts/ContractsRepository";
import web3Provider from "./web3Provider";

export async function loadBeforeIcoDetailsFromContract() {
  const neumarkInitialRate = await publicCommitment.issuanceRate;

  return {
    neumarkInitialRate,
  };
}
