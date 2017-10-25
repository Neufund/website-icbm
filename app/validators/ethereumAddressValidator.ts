import { Web3Service } from "../web3/web3Service";

export function ethereumAddressValidator(value: string): string | undefined {
  if (!Web3Service.instance.rawWeb3.isAddress(value)) {
    return "It's not valid eth address";
  }
  return undefined;
}
