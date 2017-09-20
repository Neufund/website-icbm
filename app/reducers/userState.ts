import { LOAD_USER_ACCOUNTS, SET_USER_ACCOUNTS } from "../actions/constants";
import { Reducer } from "../types";

export interface IUserState {
  loading: boolean;
  selectedAddress: string;
  addresses: string[];
}

const initialState: IUserState = {
  loading: true,
  selectedAddress: null,
  addresses: null,
};

const reducer: Reducer<IUserState> = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_USER_ACCOUNTS:
      return { ...state, loading: true };
    case SET_USER_ACCOUNTS:
      return {
        ...state,
        loading: false,
        selectedAddress: payload.accounts[0],
        addresses: payload.accounts,
      };
    default:
      return state;
  }
};

export default reducer;

export function selectIsKnownUser(state: IUserState): boolean {
  return state.addresses && state.addresses.length > 0;
}

export function selectLoading(state: IUserState): boolean {
  return state.loading;
}
