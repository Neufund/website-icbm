import * as Web3 from "web3";
import { AppState } from "../actions/constants";
import config from "../config";

export let web3Instance: any;

if (config.appState !== AppState.CONTRACTS_DEPLOYED) {
  web3Instance = null;
} else {
  web3Instance =
    typeof (window as any).web3 !== "undefined"
      ? new Web3((window as any).web3.currentProvider)
      : new Web3(new Web3.providers.HttpProvider(config.contractsDeployed.rpcProvider));
}

export default web3Instance;
