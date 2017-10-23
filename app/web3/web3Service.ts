import { BigNumber } from "bignumber.js";
import * as Web3 from "web3";

import { promisify } from "bluebird";
import { Dispatch } from "react-redux";
import { AppState } from "../actions/constants";
import { loadUserAccount } from "../actions/loadUserAccount";
import config from "../config";
import { IAppState } from "../reducers/index";

const CHECK_INJECTED_WEB3_INTERVAL = 1000;

export interface IAccountInfo {
  address: string;
  balance: BigNumber;
}

export class Web3Service {
  public static init(dispatch: Dispatch<IAppState>, getState: () => IAppState) {
    Web3Service._instance = new Web3Service(dispatch, getState);
  }

  private static _instance: Web3Service;

  public static get instance() {
    if (!Web3Service._instance) {
      throw new Error("Web3Service in not initialized!");
    }
    return Web3Service._instance;
  }

  public personalWeb3: Web3 | undefined;
  public readonly rawWeb3: Web3;
  public readonly getBlockNumber: () => PromiseLike<number>;
  public readonly getBlock: (blockNumber: string | number) => PromiseLike<{}>;
  public readonly getTransaction: (tx: string) => PromiseLike<any>;

  private constructor(private dispatch: Dispatch<IAppState>, private getState: () => IAppState) {
    if (config.appState !== AppState.CONTRACTS_DEPLOYED) {
      return;
    }

    this.rawWeb3 = new Web3(new Web3.providers.HttpProvider(config.contractsDeployed.rpcProvider));

    this.getBlockNumber = promisify(this.rawWeb3.eth.getBlockNumber);
    this.getBlock = promisify(this.rawWeb3.eth.getBlock);
    this.getTransaction = promisify<any, string>(this.rawWeb3.eth.getTransaction);

    this.checkInjectedWeb3();
  }

  public hasPersonalWeb3(): boolean {
    return this.personalWeb3 !== undefined;
  }

  public async accountAddress(): Promise<string> {
    if (!this.hasPersonalWeb3()) {
      return;
    }
    const getAccounts = promisify(this.personalWeb3.eth.getAccounts);
    const accounts = (await getAccounts()) as string[];
    return accounts[0];
  }

  public async accountInfo(): Promise<IAccountInfo> {
    return {} as any;
  }

  private checkInjectedWeb3() {
    const newInjectedWeb3 = (window as any).web3;
    if (typeof newInjectedWeb3 === "undefined") {
      return;
    }

    this.personalWeb3 = newInjectedWeb3;
    window.setInterval(() => this.checkAccounts(), CHECK_INJECTED_WEB3_INTERVAL);
  }

  private async checkAccounts() {
    const account = await this.accountAddress();

    const currentAccount = this.getState().userState.address;

    if (account && account !== currentAccount) {
      return this.dispatch(loadUserAccount);
    }
  }
}
