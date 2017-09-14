import { BigNumber } from "bignumber.js";
import { INeumark, Neumark } from "./contracts";
import { asEtherNumber } from "./utils";

const getBalance = async (address: string) => {
  return await Neumark().then((neumarkInstance: INeumark) =>
    neumarkInstance.balanceOfAsync(address).then((balance: BigNumber) => {
      return asEtherNumber(balance);
    })
  );
};

export async function loadUserParamsFromNeumark(address: string) {
  const [balance] = await Promise.all([getBalance(address)]);
  return {
    balance,
  };
}
export default loadUserParamsFromNeumark;
