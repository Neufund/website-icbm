/*
   Doc https://support.mycrypto.com/how-to/sending/creating-prefilled-transaction
   at moment when code was prepared 25.11.2020 beta functionality didn't work
 */

export const myCryptoUrl = (
  to: string,
  value: number,
  data: string
): string => {
  return `https://mycrypto.com/account/send?&to=${to}&value=${value}&data=${data}`;
};
