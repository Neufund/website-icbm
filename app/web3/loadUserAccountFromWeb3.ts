import { BigNumber } from "bignumber.js";

import { getBalance } from "./utils";
import { Web3Service } from "./web3Service";

export async function loadUserAccountFromWeb3(): Promise<string> {
  return Web3Service.instance.accountAddress();
}

export async function getBalanceFromWeb3(address: string): Promise<BigNumber> {
  return getBalance(Web3Service.instance.rawWeb3, address);
}
