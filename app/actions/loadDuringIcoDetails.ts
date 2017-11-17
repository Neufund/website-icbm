import { ThunkAction } from "redux-thunk";
import { IAppState } from "../reducers/index";
import { IStandardReduxAction } from "../types";
import { loadDuringIcoDetailsFromContract } from "../web3/loadDuringIcoDetailsFromContract";
import { LOADING_DURING_ICO_DETAILS, SET_DURING_ICO_DETAILS } from "./constants";

export function setDuringIcoDetailsAction(
  totalNeumarkSupply: string,
  reservedNeumarks: string,
  issuanceRate: string,
  ethCommitted: string,
  euroCommitted: string,
  allInvestors: string,
  platformOperatorNeumarkRewardShare: string,
  totalCurveWei: string
): IStandardReduxAction {
  return {
    type: SET_DURING_ICO_DETAILS,
    payload: {
      totalNeumarkSupply,
      reservedNeumarks,
      issuanceRate,
      ethCommitted,
      euroCommitted,
      allInvestors,
      platformOperatorNeumarkRewardShare,
      totalCurveWei,
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

  const {
    totalNeumarkSupply,
    reservedNeumarks,
    issuanceRate,
    ethCommitted,
    eurCommitted,
    investors,
    platformOperatorNeumarkRewardShare,
    totalCurveWei,
  } = await loadDuringIcoDetailsFromContract(ethEurFraction, ethDecimals);

  dispatcher(
    setDuringIcoDetailsAction(
      totalNeumarkSupply.toString(),
      reservedNeumarks.toString(),
      issuanceRate.toString(),
      ethCommitted.toString(),
      eurCommitted.toString(),
      investors.toString(),
      platformOperatorNeumarkRewardShare.toString(),
      totalCurveWei.toString()
    )
  );
};
