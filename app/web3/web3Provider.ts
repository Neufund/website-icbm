import { promisify } from "bluebird";
import  LedgerWalletSubproviderFactory from "ledger-wallet-provider";
import * as Web3 from "web3";
import * as Web3ProviderEngine from "web3-provider-engine";
import * as RpcSubprovider from "web3-provider-engine/subproviders/rpc";
import { AppState } from "../actions/constants";
import config from "../config";

export let web3Instance: any;

async function getNetworkId() {
  return promisify(web3Instance.version.getNetwork)();
}

export async function initWeb3() {
  if (config.appState !== AppState.CONTRACTS_DEPLOYED) {
    web3Instance = null;
  } else {
    if (typeof (window as any).web3 !== "undefined") {
      web3Instance = new Web3((window as any).web3.currentProvider);
    } else {
      const engine = new Web3ProviderEngine();
      const ledger = await LedgerWalletSubproviderFactory(getNetworkId);

      engine.addProvider(ledger);
      engine.addProvider(
        new RpcSubprovider({
          rpcUrl: "/node",
        })
      );
      engine.start();
      web3Instance = new Web3(engine);
    }
  }
}

export default web3Instance;
