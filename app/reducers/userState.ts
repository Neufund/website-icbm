import { SET_USER_ACCOUNT } from "../actions/constants";
import { Reducer } from "../types";

export interface IUserState {
  address: string;
}

const initialState: IUserState = {
  address: null,
};

const reducer: Reducer<IUserState> = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_USER_ACCOUNT:
      return {
        ...state,
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
