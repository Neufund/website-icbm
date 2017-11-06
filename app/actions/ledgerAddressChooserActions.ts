import * as BigNumber from "bignumber.js";
import { toPairs, zip } from "lodash";
import { ThunkAction } from "redux-thunk";

import { LedgerService } from "../ledgerService";
import { IAppState } from "../reducers/index";
import { ILedgerAccount } from "../reducers/ledgerAddressChooserState";
import { Web3Service } from "../web3/web3Service";
import {
  LEDGER_DERIVATION_PATH_CHANGE,
  LEDGER_GET_ADDRESSES_LOADED,
  LEDGER_GET_ADDRESSES_LOADING,
  LEDGER_NEXT_PAGE,
  LEDGER_PREV_PAGE,
  Web3Type,
} from "./constants";
import { getInvestorDetails, setUserAccountAction } from "./loadUserAccount";
import { finishSelectionAction } from "./walletSelectorActions";
import { setWeb3Action } from "./web3";

const NUMBER_OF_ADDRESSES_PER_PAGE = 5;

export const getAddressesLoadingAction = () => ({
  type: LEDGER_GET_ADDRESSES_LOADING,
});

export const setAddressesAction = (accounts: ILedgerAccount[]) => ({
  type: LEDGER_GET_ADDRESSES_LOADED,
  payload: {
    accounts,
  },
});

export const nextPageAction = () => ({
  type: LEDGER_NEXT_PAGE,
});

export const prevPageAction = () => ({
  type: LEDGER_PREV_PAGE,
});

export const derivationPathChangedAction = (derivationPath: string) => ({
  type: LEDGER_DERIVATION_PATH_CHANGE,
  payload: {
    derivationPath,
  },
});

export const ledgerGetAddresses: ThunkAction<{}, IAppState, {}> = async (dispatch, getState) => {
  dispatch(getAddressesLoadingAction());

  const state = getState().ledgerAddressChooserState;

  const derivationPathsObject = await LedgerService.instance.getMultipleAccountsAsync(
    state.derivationPath,
    state.page * NUMBER_OF_ADDRESSES_PER_PAGE,
    NUMBER_OF_ADDRESSES_PER_PAGE
  );

  const derivationPathsArray = toPairs(derivationPathsObject).map(pair => ({
    derivationPath: pair[0],
    address: pair[1],
  }));

  const balances = await Promise.all(
    derivationPathsArray.map(dp =>
      Web3Service.instance.getBalance(dp.address).then(bn => bn.toString())
    )
  );

  const accounts = (zip(derivationPathsArray, balances as any).map(([dp, balance]) => ({
    ...dp,
    balance,
  })) as any) as ILedgerAccount[];

  dispatch(setAddressesAction(accounts));
};

export const showNextAddresses: ThunkAction<{}, IAppState, {}> = async dispatch => {
  dispatch(nextPageAction());
  return dispatch(ledgerGetAddresses);
};

export const showPrevAddresses: ThunkAction<{}, IAppState, {}> = async dispatch => {
  dispatch(prevPageAction());
  return dispatch(ledgerGetAddresses);
};

export const changeDerivationPath: (
  derivationPath: string
) => ThunkAction<{}, IAppState, {}> = derivationPath => async dispatch => {
  dispatch(derivationPathChangedAction(derivationPath));
  return dispatch(ledgerGetAddresses);
};

export const chooseAccount: (account: ILedgerAccount) => ThunkAction<{}, IAppState, {}> = (
  account: ILedgerAccount
) => async (dispatch, getState) => {
  const state = getState();
  Web3Service.instance.stopWatchingAccounts();
  Web3Service.instance.personalWeb3 = LedgerService.instance.ledgerWeb3;
  LedgerService.instance.ledgerInstance.setDerivationPath(account.derivationPath);

  const investorDetails = await getInvestorDetails(
    account.address,
    new BigNumber.BigNumber(state.commitmentState.ethEurFraction)
  );

  dispatch(
    setUserAccountAction(
      account.address,
      account.balance,
      investorDetails.type,
      investorDetails.preferredTicket ? investorDetails.preferredTicket.toString() : ""
    )
  );
  dispatch(setWeb3Action(Web3Type.LEDGER));
  dispatch(finishSelectionAction());
};
