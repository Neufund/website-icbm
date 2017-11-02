import { ERROR_SET } from "../actions/constants";
import { Reducer } from "../types";

export interface IErrorState {
  error: string;
}

const initialState: IErrorState = {
  error: null,
};

const reducer: Reducer<IErrorState> = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ERROR_SET:
      return {
        error: payload.error,
      };
    default:
      return state;
  }
};

export default reducer;
