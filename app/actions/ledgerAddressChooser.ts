import { mapValues, values } from "lodash";
import promiseAll = require("promise-all");
import { ThunkAction } from "redux-thunk";

import { LedgerService } from "../ledgerService";
import { IAppState } from "../reducers/index";
import { Web3Service } from "../web3/web3Service";
import { LEDGER_GET_ADDRESSES_LOADING } from "./constants";

const NUMBER_OF_ADDRESSES_PER_PAGE = 5;

export const getAddressesLoadingAction = () => ({
  type: LEDGER_GET_ADDRESSES_LOADING,
});

export const ledgerGetAddresses: ThunkAction<{}, IAppState, {}> = async (dispatch, getState) => {
  dispatch(getAddressesLoadingAction());

  const state = getState().ledgerAddressChooserState;

  // for (let i = state.index; i < state.index + NUMBER_OF_ADDRESSES_PER_PAGE; i = i + 1) {
  //   stateCopy.addresses[stateCopy.derivationPath + i] = {
  //     address: null,
  //     ETH: null,
  //   };
  // }

  const newAddresses = await LedgerService.instance.getMultipleAccountsAsync(
    state.derivationPath,
    state.page * NUMBER_OF_ADDRESSES_PER_PAGE,
    NUMBER_OF_ADDRESSES_PER_PAGE
  );

  const balances = await promiseAll(
    mapValues(newAddresses, address =>
      Web3Service.instance.getBalance(address).then(b => b.toString())
    )
  );

  const addresses = keys(newAddresses).reduce((dp, acc) => ({ ...acc, [dp]: {} }));

  // for (const dp in addresses) {
  //   if (addresses.hasOwnProperty(dp)) {
  //     const address = addresses[dp];
  //     stateCopy.addresses[dp].address = address;
  //     stateCopy.addresses[dp].ETH = web3Instance.fromWei(
  //       await web3Instance.eth.getBalanceAsync(address),
  //       "ether"
  //     );
};
