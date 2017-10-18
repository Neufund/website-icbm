import { promisify } from "bluebird";
import { neumark } from "./contracts/ContractsRepository";
import { web3Instance as web3Provider } from "./web3Provider";

export async function loadUserAccountFromWeb3(): Promise<string> {
  const getAccounts = promisify(web3Provider.eth.getAccounts);
  const accounts = (await getAccounts()) as string[];
  return accounts[0] || null;
}

export async function loadLegalAgreementsHashesFromWeb3(): Promise<{
  reservationAgreementHash: string;
  tokenHolderAgreementHash: string;
}> {
  const [
    [_platform, _block, reservationAgreement],
    [_platform2, _block2, tokenHolderAgreement],
  ] = await Promise.all([neumark.currentAgreement(), neumark.currentAgreement()]);

  return {
    reservationAgreementHash: reservationAgreement.substr(5),
    tokenHolderAgreementHash: reservationAgreement.substr(5),
  };
}
