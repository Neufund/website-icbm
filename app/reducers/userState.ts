import {
  SET_DERIVATION_PATH,
  SET_LOADING_USER_ACCOUNT,
  SET_USER_ACCOUNT,
} from "../actions/constants";
import { Reducer } from "../types";

export interface IUserState {
  loading: boolean;
  address: string;
  derivationPath: string;
}

const initialState: IUserState = {
  loading: true,
  address: null,
  derivationPath: null,
};

const reducer: Reducer<IUserState> = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_LOADING_USER_ACCOUNT:
      return {
        ...state,
        loading: payload.loading,
      };
    // TODO: we need to decide on consistent naming account vs address
    case SET_USER_ACCOUNT:
      return {
        ...state,
        loading: false,
        address: payload.address,
      };
    case SET_DERIVATION_PATH:
      return {
        ...state,
        derivationPath: payload.derivationPath,
      };
    default:
      return state;
  }
};

export default reducer;

export function selectIsKnownUser(state: IUserState): boolean {
  return state.address !== null;
}

export function selectLoading(state: IUserState): boolean {
  return state.loading;
}

export function selectDerivationPath(state: IUserState): string {
  return state.derivationPath;
}
