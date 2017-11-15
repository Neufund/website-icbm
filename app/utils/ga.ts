declare const ga: any;
import { Web3Type } from "../actions/constants";

export const trackWeb3TypeType = (web3Type: Web3Type): void => {
  ga("send", "event", "commit", "web3Type", web3Type.toString());
};
