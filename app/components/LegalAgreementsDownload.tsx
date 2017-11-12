import * as React from "react";
import { DownloadDocumentLink } from "./DownloadDocumentLink";

import * as BigNumber from "bignumber.js";
import { connect } from "react-redux";
import { TokenType } from "../actions/constants";
import {
  getReservationAgreementGeneralTags,
  getTokenHolderAgreementGeneralTags,
} from "../actions/getTags";
import { IAppState } from "../reducers/index";
import {
  selectReservationAgreementHash,
  selectTokenHolderAgreementHash,
} from "../reducers/legalAgreementState";
import * as styles from "./LegalAgreementsDownload.scss";

interface ILegalAgreementsDownloadComponent {
  tokenHolderAgreementHash: string;
  reservationAgreementHash: string;
  ethEurFraction: string;
}

const LegalAgreementsDownloadComponent: React.SFC<ILegalAgreementsDownloadComponent> = ({
  tokenHolderAgreementHash,
  reservationAgreementHash,
  ethEurFraction,
}) =>
  <div className={styles.downloadDocumentLink}>
    <DownloadDocumentLink
      key="neumark_token_holder_agreement"
      documentHash={tokenHolderAgreementHash}
      getTags={getTokenHolderAgreementGeneralTags}
      outputFilename="neumark_token_holder_agreement"
    >
      Token Holder Agreement
    </DownloadDocumentLink>

    <DownloadDocumentLink
      key="reservation_agreement"
      documentHash={reservationAgreementHash}
      getTags={() => {
        // tslint:disable-next-line:jsx-no-lambda
        const ethEurFractionBigNumber = new BigNumber.BigNumber(ethEurFraction);
        const tokenType: TokenType = TokenType.ETHER;
        return getReservationAgreementGeneralTags(tokenType, ethEurFractionBigNumber);
      }}
      outputFilename="reservation_agreement"
    >
      Reservation Agreement
    </DownloadDocumentLink>
  </div>;

export const LegalAgreementsDownload = connect((state: IAppState) => ({
  tokenHolderAgreementHash: selectTokenHolderAgreementHash(state.legalAgreementState),
  reservationAgreementHash: selectReservationAgreementHash(state.legalAgreementState),
  ethEurFraction: state.commitmentState.ethEurFraction,
}))(LegalAgreementsDownloadComponent);
