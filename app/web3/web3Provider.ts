import { promisify } from "bluebird";
import ledgerWalletProvider from "ledger-wallet-provider";
import { Dispatch } from "redux";
import * as Web3 from "web3";
import * as Web3ProviderEngine from "web3-provider-engine";
import * as RpcSubprovider from "web3-provider-engine/subproviders/rpc";

import { AppState, Web3Type } from "../actions/constants";
import { setWeb3Action } from "../actions/web3";
import config from "../config";
import { IStandardReduxAction } from "../types";

export let web3Instance: any;
export let ledgerInstance: any;

async function getNetworkId() {
  return promisify(web3Instance.version.getNetwork)();
}

export async function initWeb3(dispatch: Dispatch<IStandardReduxAction>) {
  if (config.appState !== AppState.CONTRACTS_DEPLOYED) {
    web3Instance = null;
    ledgerInstance = null;
  } else {
    let web3Type: Web3Type;
    if (typeof (window as any).web3 !== "undefined") {
      web3Type = Web3Type.INJECTED;
      web3Instance = new Web3((window as any).web3.currentProvider);
    } else {
      web3Type = Web3Type.LEDGER;
      const engine = new Web3ProviderEngine();
      const ledger = await ledgerWalletProvider(getNetworkId);
      ledgerInstance = ledger.ledger;

      engine.addProvider(ledger);
      engine.addProvider(
        new RpcSubprovider({
          rpcUrl: "/node",
        })
      );
      engine.start();
      web3Instance = new Web3(engine);
    }
    dispatch(setWeb3Action(web3Type));
  }
}

export default web3Instance;
