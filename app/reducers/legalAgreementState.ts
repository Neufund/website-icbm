import { SET_LEGAL_AGREEMENTS, SET_LEGAL_AGREEMENTS_ACCEPTED } from "../actions/constants";
import { Reducer } from "../types";

export interface ILegalAgreementState {
  accepted: boolean;
  reservationAgreement: string;
  tokenHolderAgreement: string;
}

const initialState: ILegalAgreementState = {
  accepted: false,
  reservationAgreement: null,
  tokenHolderAgreement: null,
};

const reducer: Reducer<ILegalAgreementState> = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_LEGAL_AGREEMENTS_ACCEPTED:
      return {
        ...state,
        accepted: true,
      };
    case SET_LEGAL_AGREEMENTS:
      return {
        ...state,
        reservationAgreement: payload.reservationAgreement,
        tokenHolderAgreement: payload.tokenHolderAgreement,
      };
    default:
      return state;
  }
};

export default reducer;
