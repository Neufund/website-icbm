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

export const loadDuringIcoDetails: ThunkAction<{}, IAppState, {}> = async (
  dispatcher,
  getState
) => {
  dispatcher(loadDuringIcoDetailsAction());

  const { ethEurFraction, ethDecimals } = getState().commitmentState;

  const { totalSupply, issuanceRate, allFunds, investors } = await loadDuringIcoDetailsFromContract(
    ethEurFraction,
    ethDecimals
  );

  dispatcher(
    setDuringIcoDetailsAction(
      totalSupply.toString(),
      issuanceRate.toString(),
      allFunds.toString(),
      investors.toString()
    )
  );
};
