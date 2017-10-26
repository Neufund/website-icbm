import { IStandardReduxAction } from "../types";
import { EthNetwork, SET_ETH_NETWORK, SET_WEB3_TYPE, Web3Type } from "./constants";

export function setWeb3Action(web3Type: Web3Type): IStandardReduxAction {
  return {
    type: SET_WEB3_TYPE,
    payload: {
      web3Type,
    },
  };
}

export function setEthNetworkAction(ethNetwork: EthNetwork): IStandardReduxAction {
  return {
    type: SET_ETH_NETWORK,
    payload: {
      ethNetwork,
    },
  };
}
