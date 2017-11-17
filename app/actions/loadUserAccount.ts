import * as BigNumber from "bignumber.js";
import { ThunkAction } from "redux-thunk";

import config, { CommitmentType } from "../config";
import { IAppState } from "../reducers/index";
import { IStandardReduxAction } from "../types";
import { getBalanceFromWeb3, loadWhitelistedTicket } from "../web3/loadUserAccountFromWeb3";
import { convertEurToEth } from "../web3/utils";
import { InvestorType, SET_LOADING_USER_ACCOUNT, SET_USER_ACCOUNT } from "./constants";

export function setUserAccountAction(
  address: string,
  balance: string,
  investorType: InvestorType,
  preferredTicket: string,
  reservedNeumarks: string
): IStandardReduxAction {
  return {
    type: SET_USER_ACCOUNT,
    payload: {
      balance,
      investorType,
      preferredTicket,
      reservedNeumarks,
      address,
    },
  };
}

export function setLoadingAction(isLoading: boolean): IStandardReduxAction {
  return {
    type: SET_LOADING_USER_ACCOUNT,
    payload: {
      loading: isLoading,
    },
  };
}

export async function getInvestorDetails(
  address: string,
  ethEurFraction: BigNumber.BigNumber
): Promise<{
  type: InvestorType;
  reservedTicket: BigNumber.BigNumber;
  reservedNeumarks: BigNumber.BigNumber;
}> {
  if (config.contractsDeployed.commitmentType === CommitmentType.PUBLIC) {
    return {
      type: InvestorType.PUBLIC,
      reservedTicket: new BigNumber.BigNumber(0),
      reservedNeumarks: new BigNumber.BigNumber(0),
    };
  } else {
    const [tokenType, ticketEurUlps, reservedNeumarks] = await loadWhitelistedTicket(address);
    // if token is not specified it means its not on whitelist
    if (tokenType.eq(0)) {
      return {
        type: InvestorType.NOT_ALLOWED,
        reservedTicket: new BigNumber.BigNumber(0),
        reservedNeumarks: new BigNumber.BigNumber(0),
      };
    } else {
      if (ticketEurUlps.greaterThan(0)) {
        const ticketInWei = convertEurToEth(new BigNumber.BigNumber(ethEurFraction), ticketEurUlps);
        return {
          reservedNeumarks,
          type: InvestorType.PRESALE,
          reservedTicket: ticketInWei,
        };
      } else {
        return {
          type: InvestorType.WHITELISTED,
          reservedTicket: new BigNumber.BigNumber(0),
          reservedNeumarks: new BigNumber.BigNumber(0),
        };
      }
    }
  }
}

export const loadUserAccount: (address: string) => ThunkAction<{}, IAppState, {}> = (
  address: string
) => async (dispatcher, getState) => {
  const state = getState();
  const { userState } = getState();

  if (address !== userState.address) {
    const balance = await getBalanceFromWeb3(address);
    const investorDetails = await getInvestorDetails(
      address,
      new BigNumber.BigNumber(state.commitmentState.ethEurFraction)
    );

    dispatcher(
      setUserAccountAction(
        address,
        balance.toString(),
        investorDetails.type,
        investorDetails.reservedTicket.toString(),
        investorDetails.reservedNeumarks.toString()
      )
    );
  }
};
