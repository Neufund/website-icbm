import { EthNetwork } from "../actions/constants";

export function etherscanAccountUrl(address: string, ethNetwork: EthNetwork): string {
  return `https://${networkToEtherscanPrefix(ethNetwork)}etherscan.io/address/${address}`;
}

export function etherscanTransactionUrl(tx: string, ethNetwork: EthNetwork): string {
  return `https://${networkToEtherscanPrefix(ethNetwork)}etherscan.io/tx/${tx}`;
}

export function etherscanBlockUrl(block: string, ethNetwork: EthNetwork): string {
  return `https://${networkToEtherscanPrefix(ethNetwork)}etherscan.io/block/${block}`;
}

function networkToEtherscanPrefix(ethNetwork: EthNetwork) {
  switch (ethNetwork) {
    case EthNetwork.MAINNET:
      return "";
    case EthNetwork.ROPSTEN:
      return "ropsten.";
    case EthNetwork.RIKENBY:
      return "rinkeby.";
    case EthNetwork.KOVAN:
      return "kovan.";
    default:
      return "";
  }
}
