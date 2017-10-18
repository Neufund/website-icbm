import { neumark, publicCommitment } from "./contracts/ContractsRepository";

export async function loadLegalAgreementsHashesFromWeb3(): Promise<{
  reservationAgreementHash: string;
  tokenHolderAgreementHash: string;
}> {
  const [
    [_platform, _block, tokenHolderAgreement],
    [_platform2, _block2, reservationAgreement],
  ] = await Promise.all([neumark.currentAgreement(), publicCommitment.currentAgreement()]);

  return {
    reservationAgreementHash: reservationAgreement.substr(5),
    tokenHolderAgreementHash: tokenHolderAgreement.substr(5),
  };
}
