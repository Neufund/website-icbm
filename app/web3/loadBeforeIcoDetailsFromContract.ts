import { issuanceRate } from "./loadDuringIcoDetailsFromContract";

export async function loadBeforeIcoDetailsFromContract() {
  return {
    neumarkInitialRate: await issuanceRate(),
  };
}
