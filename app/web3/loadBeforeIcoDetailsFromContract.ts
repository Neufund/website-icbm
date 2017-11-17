import { issuanceRate } from "./loadDuringIcoDetailsFromContract";

export async function loadBeforeIcoDetailsFromContract(ethDecimals: number) {
  return {
    neumarkInitialRate: await issuanceRate(ethDecimals),
  };
}
