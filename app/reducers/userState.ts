import { SET_LOADING_USER_ACCOUNT, SET_USER_ACCOUNT } from "../actions/constants";
import { Reducer } from "../types";

export interface IUserState {
  loading: boolean;
  address: string;
}

const initialState: IUserState = {
  loading: true,
  address: null,
};

const reducer: Reducer<IUserState> = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_LOADING_USER_ACCOUNT:
      return {
        ...state,
        loading: payload.loading,
      };
    case SET_USER_ACCOUNT:
      return {
        ...state,
        loading: false,
        address: payload.address,
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
