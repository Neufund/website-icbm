import { publicCommitment } from "./contracts/ContractsRepository";

export async function loadBeforeIcoDetailsFromContract() {
  const neumarkInitialRate = await publicCommitment.issuanceRate;

  return {
    neumarkInitialRate,
  };
}
