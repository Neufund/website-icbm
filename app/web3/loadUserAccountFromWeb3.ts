import { promisify } from "bluebird";
import { web3Instance as web3Provider } from "./web3Provider";

export async function loadUserAccountFromWeb3(): Promise<string> {
  const getAccounts = promisify(web3Provider.eth.getAccounts);
  const accounts = (await getAccounts()) as string[];
  return accounts[0] || null;
}
