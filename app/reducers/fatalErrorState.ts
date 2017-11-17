import { SET_FATAL_ERROR } from "../actions/constants";
import { Reducer } from "../types";

export interface IFatalErrorState {
  fatalError: string;
}

const initialState: IFatalErrorState = {
  fatalError: null,
};

const reducer: Reducer<IFatalErrorState> = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_FATAL_ERROR:
      return {
        fatalError: payload.fatalError,
      };
    default:
      return state;
  }
};

export default reducer;
