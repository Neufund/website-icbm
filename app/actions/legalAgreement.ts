import { ThunkAction } from "redux-thunk";

import { replaceTags } from "../agreements/utils";
import { IAppState } from "../reducers/index";
import { IStandardReduxAction } from "../types";
import { getDocumentFromIPFS } from "../utils/ipfs";
import { loadLegalAgreementsHashesAndTagsFromWeb3 } from "../web3/loadLegalAgreementsFromContract";
import { SET_LEGAL_AGREEMENTS, SET_LEGAL_AGREEMENTS_ACCEPTED } from "./constants";
import { getReservationAgreementGeneralTags } from "./getTags";

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

  const reservationAgreementGeneralTags = await getReservationAgreementGeneralTags();
  const reservationAgreementWithGeneralTagsReplaced = replaceTags(
    reservationAgreement,
    reservationAgreementGeneralTags
  );

  dispatcher(
    loadAgreementsAction({
      tokenHolderAgreement,
      reservationAgreement: reservationAgreementWithGeneralTagsReplaced,
      reservationAgreementHash: agreementHashes.reservationAgreementHash,
      tokenHolderAgreementHash: agreementHashes.tokenHolderAgreementHash,
    })
  );
};
