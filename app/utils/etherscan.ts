import { EtherScanLinkType, EthNetwork } from "../actions/constants";

export function etherscanUrl(
  type: EtherScanLinkType,
  resourceId: string | number,
  ethNetwork: EthNetwork
): string {
  let pathType;
  switch (type) {
    case EtherScanLinkType.ADDRES:
      pathType = "address";
      break;
    case EtherScanLinkType.TRANSACTION:
      pathType = "tx";
      break;
    case EtherScanLinkType.BLOCK:
      pathType = "block";
      break;
  }
  return `https://${networkToEtherscanPrefix(ethNetwork)}etherscan.io/${pathType}/${resourceId}`;
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
