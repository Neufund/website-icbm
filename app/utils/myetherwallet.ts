import { MyEtherWalletSendMode } from "../actions/constants";

export const myEtherWalletUrl = (
  to: string,
  value: number,
  sendMode: MyEtherWalletSendMode,
  tokenSymbol: string,
  gasLimit: string,
  data: string
): string => {
  return `https://www.myetherwallet.com/?to=${to}&value=${value}&sendMode=${sendMode}&tokenSymbol=${tokenSymbol}&gaslimit=${gasLimit}&data=${data}#send-transaction`;
};
