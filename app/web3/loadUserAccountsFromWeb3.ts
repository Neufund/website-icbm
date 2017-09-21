import { promisify } from "bluebird";
import web3Provider from "./web3Provider";

export async function loadUserAccountsFromWeb3(): Promise<string[]> {
  const accounts = (await promisify(web3Provider.eth.getAccounts)()) as string[];

  return accounts;
}
