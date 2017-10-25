import { Web3Service } from "./web3Service";

export async function loadUserAccountFromWeb3(): Promise<string> {
  return Web3Service.instance.accountAddress();
}
