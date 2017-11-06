import * as BigNumber from "bignumber.js";
import { ThunkAction } from "redux-thunk";

import config, { CommitmentType } from "../config";
import { IAppState } from "../reducers/index";
import { IStandardReduxAction } from "../types";
import {
  getBalanceFromWeb3,
  loadUserAccountFromWeb3,
  loadWhitelistedTicket,
} from "../web3/loadUserAccountFromWeb3";
import { convertEurToEth } from "../web3/utils";
import { InvestorType, SET_LOADING_USER_ACCOUNT, SET_USER_ACCOUNT } from "./constants";

export function setUserAccountAction(
  account: string,
  balance: string,
  investorType: InvestorType,
  preferredTicket: string
): IStandardReduxAction {
  return {
    type: SET_USER_ACCOUNT,
    payload: {
      balance,
      investorType,
      preferredTicket,
      address: account,
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
): Promise<{ type: InvestorType; preferredTicket?: BigNumber.BigNumber }> {
  if (config.contractsDeployed.commitmentType === CommitmentType.PUBLIC) {
    return { type: InvestorType.PUBLIC };
  } else {
    const [tokenType, ticketEurUlps] = await loadWhitelistedTicket(address);
    // if token is not specified it means its not on whiteliste
    if (tokenType.eq(0)) {
      return { type: InvestorType.NOT_ALLOWED };
    } else {
      if (ticketEurUlps.greaterThan(0)) {
        const ticketInWei = convertEurToEth(new BigNumber.BigNumber(ethEurFraction), ticketEurUlps);
        return { type: InvestorType.PRESALE, preferredTicket: ticketInWei };
      } else {
        return {
          type: InvestorType.WHITELISTED,
        };
      }
    }
  }
}

export const loadUserAccount: ThunkAction<{}, IAppState, {}> = async (dispatcher, getState) => {
  const state = getState();

  const account = await loadUserAccountFromWeb3();
  const { userState } = getState();
  if (account && account !== userState.address) {
    const balance = await getBalanceFromWeb3(account);
    const investorDetails = await getInvestorDetails(
      account,
      new BigNumber.BigNumber(state.commitmentState.ethEurFraction)
    );

    dispatcher(
      setUserAccountAction(
        account,
        balance.toString(),
        investorDetails.type,
        investorDetails.preferredTicket ? investorDetails.preferredTicket.toString() : ""
      )
    );
  }
};
