import { promisify } from "bluebird";
import web3Provider from "./web3Provider";

const getAccounts = promisify(web3Provider.eth.getAccounts);

export async function loadUserAccountFromWeb3(): Promise<string> {
  const accounts = (await getAccounts()) as string[];
  return accounts[0];
}
