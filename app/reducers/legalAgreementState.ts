import { SET_LEGAL_AGREEMENTS_ACCEPTED } from "../actions/constants";
import { Reducer } from "../types";

export interface ILegalAgreementState {
  accepted: boolean;
}

const initialState: ILegalAgreementState = {
  accepted: false,
};

const reducer: Reducer<ILegalAgreementState> = (state = initialState, action) => {
  switch (action.type) {
    case SET_LEGAL_AGREEMENTS_ACCEPTED:
      return {
        ...state,
        accepted: true,
      };
    default:
      return state;
  }
};

export default reducer;
