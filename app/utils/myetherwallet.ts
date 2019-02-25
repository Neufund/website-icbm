/*
   Doc https://github.com/kvhnuke/etherwallet#features
   for now we are omitting sendMode and tokenSymbol as we are not using those
 */

export const myEtherWalletUrl = (
  to: string,
  value: number,
  gasLimit: string,
  data: string
): string => {
  return `https://vintage.myetherwallet.com/?to=${to}&value=${value}&gaslimit=${gasLimit}&data=${data}#send-transaction`;
};
