import { BigNumber } from "bignumber.js";

import { Web3Service } from "./web3Service";

export async function loadUserAccountFromWeb3(): Promise<string> {
  return Web3Service.instance.accountAddress();
}

export async function getBalanceFromWeb3(address: string): Promise<BigNumber> {
  return Web3Service.instance.getBalance(address);
}
