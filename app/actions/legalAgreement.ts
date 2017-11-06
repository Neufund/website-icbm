import * as BigNumber from "bignumber.js";
import { ThunkAction } from "redux-thunk";

import { replaceTags } from "../agreements/utils";
import { IAppState } from "../reducers/index";
import { IStandardReduxAction } from "../types";
import { getDocumentFromIPFS } from "../utils/ipfs";
import { loadLegalAgreementsHashesAndTagsFromWeb3 } from "../web3/loadLegalAgreementsFromContract";
import { SET_LEGAL_AGREEMENTS, SET_LEGAL_AGREEMENTS_ACCEPTED } from "./constants";
import { getReservationAgreementGeneralTags, getTokenHolderAgreementGeneralTags } from "./getTags";

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

export const loadAgreements: ThunkAction<{}, IAppState, {}> = async (dispatcher, getState) => {
  const state = getState();
  const ethEurFraction = new BigNumber.BigNumber(state.commitmentState.ethEurFraction);

  const agreementHashes = await loadLegalAgreementsHashesAndTagsFromWeb3();

  const [reservationAgreement, tokenHolderAgreement] = await Promise.all([
    getDocumentFromIPFS(agreementHashes.reservationAgreementHash),
    getDocumentFromIPFS(agreementHashes.tokenHolderAgreementHash),
  ]);

  const tokenHolderAgreementGeneralTags = await getTokenHolderAgreementGeneralTags();
  const tokenHolderAgreementWithGeneralTagsReplaced = replaceTags(
    tokenHolderAgreement,
    tokenHolderAgreementGeneralTags
  );

  const reservationAgreementGeneralTags = await getReservationAgreementGeneralTags(ethEurFraction);
  const reservationAgreementWithGeneralTagsReplaced = replaceTags(
    reservationAgreement,
    reservationAgreementGeneralTags
  );

  dispatcher(
    loadAgreementsAction({
      tokenHolderAgreement: tokenHolderAgreementWithGeneralTagsReplaced,
      reservationAgreement: reservationAgreementWithGeneralTagsReplaced,
      reservationAgreementHash: agreementHashes.reservationAgreementHash,
      tokenHolderAgreementHash: agreementHashes.tokenHolderAgreementHash,
    })
  );
};
