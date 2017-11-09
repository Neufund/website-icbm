import { BigNumber } from "bignumber.js";
import { promisify } from "bluebird";
import { Dispatch } from "react-redux";
import * as Web3 from "web3";

import { AppState, EthNetwork } from "../actions/constants";
import { loadUserAccount } from "../actions/loadUserAccount";
import { setWeb3Action } from "../actions/web3";
import config from "../config";
import { MismatchedNetworkError, NoInjectedWeb3Error, WalletLockedError } from "../errors";
import { IAppState } from "../reducers/index";
import { getNetworkId, getNodeType, networkIdToEthNetwork } from "./utils";

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
  public readonly getTransactionReceipt: (tx: string) => PromiseLike<any>;
  public readonly getBalance: (address: string) => PromiseLike<BigNumber>;

  private constructor(private dispatch: Dispatch<IAppState>, private getState: () => IAppState) {
    if (config.appState !== AppState.CONTRACTS_DEPLOYED) {
      return;
    }

    this.rawWeb3 = new Web3(new Web3.providers.HttpProvider(config.contractsDeployed.rpcProvider));

    this.getBlockNumber = promisify(this.rawWeb3.eth.getBlockNumber);
    this.getBlock = promisify(this.rawWeb3.eth.getBlock);
    this.getTransaction = promisify<any, string>(this.rawWeb3.eth.getTransaction);
    this.getTransactionReceipt = promisify<any, string>(this.rawWeb3.eth.getTransactionReceipt);
    this.getBalance = promisify<BigNumber, string>(this.rawWeb3.eth.getBalance);
  }

  public hasPersonalWeb3(): boolean {
    return this.personalWeb3 !== undefined;
  }

  public async accountAddress(customWeb3?: any): Promise<string> {
    if (!this.hasPersonalWeb3() && !customWeb3) {
      return;
    }
    const getAccounts = promisify(
      customWeb3 ? customWeb3.eth.getAccounts : this.personalWeb3.eth.getAccounts
    );
    const accounts = (await getAccounts()) as string[];
    return accounts[0];
  }

  public injectWeb3 = async () => {
    const newInjectedWeb3 = (window as any).web3;
    if (typeof newInjectedWeb3 === "undefined" || newInjectedWeb3 === this.personalWeb3) {
      throw new NoInjectedWeb3Error();
    }
    const newWeb3 = new Web3(newInjectedWeb3.currentProvider);

    const internalWeb3NetworkId = await getNetworkId(this.rawWeb3);
    const personalWeb3NetworkId = await getNetworkId(newWeb3);
    if (internalWeb3NetworkId !== personalWeb3NetworkId) {
      throw new MismatchedNetworkError(EthNetwork[networkIdToEthNetwork(personalWeb3NetworkId)]);
    }

    await this.loadAccount(newWeb3);

    const injectedType = await getNodeType(newWeb3);
    this.dispatch(setWeb3Action(injectedType));

    this.personalWeb3 = newWeb3;

    return true;
  };

  public async loadAccount(customWeb3?: any) {
    const address = await this.accountAddress(customWeb3);
    if (!address) {
      throw new WalletLockedError();
    }

    const currentAccount = this.getState().userState.address;

    if (address !== currentAccount) {
      return this.dispatch(loadUserAccount(address));
    }
  }
}
