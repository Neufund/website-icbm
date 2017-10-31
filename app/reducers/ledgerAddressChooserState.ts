import config from "../config";
import { Reducer } from "../types";

export interface ILedgerAddressChooser {
  loading: boolean;
  page: number;
  derivationPath: string;
  addresses: {
    derivationPath: string;
    balance: string;
  };
}

const initialState: ILedgerAddressChooser = {
  loading: true,
  page: 0,
  derivationPath: config.contractsDeployed.defaultDerivationPath,
};

const reducer: Reducer<ILedgerAddressChooser> = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    default:
      return state;
  }
};

export default reducer;
