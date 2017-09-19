import { delay } from "bluebird";
import { ThunkAction } from "redux-thunk";
import { IAppState } from "../reducers/index";
import { IStandardReduxAction } from "../types";
import { loadDuringIcoDetailsFromContract } from "../web3/loadDuringIcoDetailsFromContract";
import { LOADING_DURING_ICO_DETAILS, SET_DURING_ICO_DETAILS } from "./constants";

export function setDuringIcoDetailsAction(
  totalSupply: string,
  issuanceRate: string,
  allFunds: string,
  allInvestors: string
): IStandardReduxAction {
  return {
    type: SET_DURING_ICO_DETAILS,
    payload: {
      totalSupply,
      issuanceRate,
      allFunds,
      allInvestors,
    },
  };
}

export function loadDuringIcoDetailsAction(): IStandardReduxAction {
  return {
    type: LOADING_DURING_ICO_DETAILS,
    payload: {},
  };
}

export const loadDuringIcoDetails: ThunkAction<{}, IAppState, {}> = async dispatcher => {
  dispatcher(loadDuringIcoDetailsAction());

  const {
    totalSupply,
    issuanceRate,
    allFunds,
    allInvestors,
  } = await loadDuringIcoDetailsFromContract();

  dispatcher(
    setDuringIcoDetailsAction(
      totalSupply.toString(),
      issuanceRate.toString(),
      allFunds.toString(),
      allInvestors.toString()
    )
  );
};
