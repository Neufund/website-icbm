import { web3Instance as web3Provider } from "../web3/web3Provider";

export function ethereumAddressValidator(value: string): string | undefined {
  if (!web3Provider.isAddress(value)) {
    return "It's not valid eth address";
  }
  return undefined;
}
