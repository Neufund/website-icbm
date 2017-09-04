import { Dispatch } from "redux";
import { selectLockedAccountAddress, selectNeumarkTokenAddress } from "../reducers/icoParameters";
// tslint:disable-next-line
import loadIcoStatsFromContract from "../web3/loadIcoStats";
import { LOAD_ICO_STATS } from "./constants";

export function loadIcoStatsAction(
  raised: number,
  investorNumber: number,
  neuMarkAmount: number,
  neuMarkToEtherRatio: number
) {
  return {
    type: LOAD_ICO_STATS,
    payload: {
      raised,
      investorNumber,
      neuMarkAmount,
      neuMarkToEtherRatio,
    },
  };
}

export async function loadIcoStats(dispatch: Dispatch<any>, getState: any) {
  const lockedAccountAddress = selectLockedAccountAddress(getState().icoParameters);
  const neumarkTokenAddress = selectNeumarkTokenAddress(getState().icoParameters);

  const {
    raised,
    investorNumber,
    neuMarkAmount,
    neuMarkToEtherRatio,
  } = await loadIcoStatsFromContract(lockedAccountAddress, neumarkTokenAddress);
  dispatch(loadIcoStatsAction(raised, investorNumber, neuMarkAmount, neuMarkToEtherRatio));
}
