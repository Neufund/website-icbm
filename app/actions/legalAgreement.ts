import { ThunkAction } from "redux-thunk";

import { IAppState } from "../reducers/index";
import { IStandardReduxAction } from "../types";
import { getDocumentFromIPFS } from "../utils/ipfs";
import { loadLegalAgreementsHashesAndTagsFromWeb3 } from "../web3/loadLegalAgreementsFromContract";
import { SET_LEGAL_AGREEMENTS, SET_LEGAL_AGREEMENTS_ACCEPTED } from "./constants";

export function legalAgreementsAcceptedAction(): IStandardReduxAction {
  return {
    type: SET_LEGAL_AGREEMENTS_ACCEPTED,
    payload: {},
  };
}

export function loadAgreementsAction(agreements: {
  reservationAgreementHash: string;
  tokenHolderAgreementHash: string;
  reservationAgreement: string;
  tokenHolderAgreement: string;
}): IStandardReduxAction {
  return {
    type: SET_LEGAL_AGREEMENTS,
    payload: agreements,
  };
}

export const loadAgreements: ThunkAction<{}, IAppState, {}> = async dispatcher => {
  const agreementHashes = await loadLegalAgreementsHashesAndTagsFromWeb3();

  const [reservationAgreement, tokenHolderAgreement] = await Promise.all([
    getDocumentFromIPFS(agreementHashes.reservationAgreementHash),
    getDocumentFromIPFS(agreementHashes.tokenHolderAgreementHash),
  ]);

  dispatcher(
    loadAgreementsAction({
      tokenHolderAgreement,
      reservationAgreement,
      reservationAgreementHash: agreementHashes.reservationAgreementHash,
      tokenHolderAgreementHash: agreementHashes.tokenHolderAgreementHash,
    })
  );
};
