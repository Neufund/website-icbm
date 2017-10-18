import { SET_LEGAL_AGREEMENTS, SET_LEGAL_AGREEMENTS_ACCEPTED } from "../actions/constants";
import { Reducer } from "../types";

export interface ILegalAgreementState {
  reservationAgreementAccepted: boolean;
  tokenHolderAgreementAccepted: boolean;
  reservationAgreement: string;
  tokenHolderAgreement: string;
}

const initialState: ILegalAgreementState = {
  reservationAgreementAccepted: false,
  tokenHolderAgreementAccepted: false,
  reservationAgreement: null,
  tokenHolderAgreement: null,
};

const reducer: Reducer<ILegalAgreementState> = (
  state = initialState,
  { type, payload }
): ILegalAgreementState => {
  switch (type) {
    case SET_LEGAL_AGREEMENTS_ACCEPTED:
      return {
        ...state,
        reservationAgreementAccepted: true,
        tokenHolderAgreementAccepted: true,
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

export function selectIsAccepted(state: ILegalAgreementState) {
  return state.reservationAgreementAccepted && state.tokenHolderAgreementAccepted;
}
