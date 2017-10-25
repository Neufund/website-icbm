import { SET_LEGAL_AGREEMENTS, SET_LEGAL_AGREEMENTS_ACCEPTED } from "../actions/constants";
import { Reducer } from "../types";

export interface ILegalAgreementState {
  reservationAgreementAccepted: boolean;
  tokenHolderAgreementAccepted: boolean;
  reservationAgreementHash: string;
  tokenHolderAgreementHash: string;
  reservationAgreement: string;
  tokenHolderAgreement: string;
}

const initialState: ILegalAgreementState = {
  reservationAgreementAccepted: false,
  tokenHolderAgreementAccepted: false,
  reservationAgreementHash: null,
  tokenHolderAgreementHash: null,
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
        reservationAgreementHash: payload.reservationAgreementHash,
        tokenHolderAgreementHash: payload.tokenHolderAgreementHash,
      };
    default:
      return state;
  }
};

export default reducer;

export function selectIsAccepted(state: ILegalAgreementState) {
  return state.reservationAgreementAccepted && state.tokenHolderAgreementAccepted;
}

export function selectReservationAgreementHash(state: ILegalAgreementState) {
  return state.reservationAgreementHash;
}

export function selectTokenHolderAgreementHash(state: ILegalAgreementState) {
  return state.tokenHolderAgreementHash;
}
