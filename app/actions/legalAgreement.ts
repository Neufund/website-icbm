import { ThunkAction } from "redux-thunk";
import { IAppState } from "../reducers/index";
import { IStandardReduxAction } from "../types";
import { fillDocument, getDocumentFromIPFS } from "../utils/ipfs";
import { loadLegalAgreementsHashesFromWeb3 } from "../web3/loadUserAccountFromWeb3";
import { SET_LEGAL_AGREEMENTS, SET_LEGAL_AGREEMENTS_ACCEPTED } from "./constants";

export function legalAgreementsAcceptedAction(): IStandardReduxAction {
  return {
    type: SET_LEGAL_AGREEMENTS_ACCEPTED,
    payload: {},
  };
}

export function loadAgreementsAction(agreements: {
  reservationAgreement: string;
  tokenHolderAgreement: string;
}): IStandardReduxAction {
  return {
    type: SET_LEGAL_AGREEMENTS,
    payload: agreements,
  };
}

export const loadAgreements: ThunkAction<{}, IAppState, {}> = async dispatcher => {
  const agreementHashes = await loadLegalAgreementsHashesFromWeb3();

  const [reservationAgreement, tokenHolderAgreement] = await Promise.all([
    getDocumentFromIPFS(agreementHashes.reservationAgreementHash),
    getDocumentFromIPFS(agreementHashes.tokenHolderAgreementHash),
  ]);

  const reservationAgreementFilled = fillDocument(reservationAgreement, {
    "acquisition-sc-address": "COMMIT ADDRESS",
    "lockin-sc-address": "LOCKIN ADDRESS",
  });

  dispatcher(
    loadAgreementsAction({ reservationAgreement: reservationAgreementFilled, tokenHolderAgreement })
  );
};
