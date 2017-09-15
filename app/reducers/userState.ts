import { IStandardReduxAction, Reducer } from "../types";

export interface IUserState {
  loading: boolean;
  address: string;
}

const initialState: IUserState = {
  loading: false,
  address: null,
};

const reducer: Reducer<IUserState> = (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    default:
      return state;
  }
};

export default reducer;
