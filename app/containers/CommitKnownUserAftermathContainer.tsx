import { BigNumber } from "bignumber.js";
import { Moment } from "moment";
import * as React from "react";
import { connect, Dispatch } from "react-redux";
import { loadAftermathDetails } from "../actions/aftermathActions";
import { getReservationAgreementTags, getTokenHolderAgreementTags } from "../actions/getTags";
import { DownloadDocumentLink } from "../components/DownloadDocumentLink";
import EtherScanLink from "../components/EtherScanLink";
import { LoadingIndicator } from "../components/LoadingIndicator";
import { UnderlinedLink } from "../components/UnderlinedLink";
import {
  selectLoading,
  selectLockedAmount,
  selectNeumarkBalance,
  selectShowDocuments,
  selectUnlockDate,
} from "../reducers/aftermathState";
import { IAppState } from "../reducers/index";
import {
  selectReservationAgreementHash,
  selectTokenHolderAgreementHash,
} from "../reducers/legalAgreementState";
import { IDictionary } from "../types";

import { EtherScanLinkType } from "../actions/constants";
import * as styles from "./Aftermath.scss";

interface IAftermathProps {
  isLoading: boolean;
  loadAftermathDetails: (address: string) => {};
  lockedAmount: BigNumber;
  neumarkBalance: BigNumber;
  unlockDate: Moment;
  getTokenHolderAgreementTags: () => Promise<IDictionary>;
  getReservationAgreementTags: () => Promise<IDictionary>;
  reservationAgreementHash: string;
  tokenHolderAgreementHash: string;
  showDocuments: boolean;
}

interface IAftermathOwnProps {
  address: string;
}

export class CommitKnownUserAftermath extends React.Component<
  IAftermathOwnProps & IAftermathProps
> {
  public componentDidMount() {
    this.props.loadAftermathDetails(this.props.address);
  }

  public async componentWillReceiveProps(_nextProps: IAftermathOwnProps & IAftermathProps) {
    if (this.props.address !== _nextProps.address) {
      this.props.loadAftermathDetails(_nextProps.address);
    }
  }

  public render() {
    const {
      isLoading,
      address,
      lockedAmount,
      unlockDate,
      neumarkBalance,
      getTokenHolderAgreementTags,
      getReservationAgreementTags,
      reservationAgreementHash,
      tokenHolderAgreementHash,
      showDocuments,
    } = this.props;

    if (isLoading) {
      return (
        <div className={styles.aftermath}>
          <LoadingIndicator />
        </div>
      );
    }
    return (
      <div className={styles.aftermath}>
        <div>
          <div className={styles.header}>Sneak peak to your committed funds</div>
          <EtherScanLink
            linkType={EtherScanLinkType.ADDRESS}
            resourceId={address}
            className={styles.etherscanLink}
            noIcon
          >
            If you want to see all your transactions, go to etherscan.io
          </EtherScanLink>
        </div>

        <div className={styles.infoBox}>
          <div className={styles.caption}>For address</div>
          <div className={styles.value}>
            {address}
          </div>
        </div>

        <div className={styles.infoBox}>
          <div className={styles.caption}>Locked amount</div>
          <div className={styles.value}>
            {lockedAmount ? `${lockedAmount.toFixed(2)} ETH` : "-"}
          </div>
        </div>

        <div className={styles.infoBox}>
          <div className={styles.caption}>Unlock date</div>
          <div className={styles.value}>
            {unlockDate ? unlockDate.format("YYYY-MM-DD") : "-"}
          </div>
        </div>

        <div className={styles.infoBox}>
          <div className={styles.caption}>Neumark balance</div>
          <div className={styles.value}>
            {neumarkBalance ? `${neumarkBalance.toFixed(2)} NEU` : "-"}
          </div>
        </div>
        {showDocuments &&
          <div className={styles.infoBox}>
            <div className={styles.caption}>Your documents</div>
            <div className={styles.value}>
              <DownloadDocumentLink
                key="neumark_token_holder_agreement"
                documentHash={tokenHolderAgreementHash}
                getTags={getTokenHolderAgreementTags}
                outputFilename="neumark_token_holder_agreement"
              >
                Token Holder Agreement
              </DownloadDocumentLink>
              <DownloadDocumentLink
                key="reservation_agreement"
                documentHash={reservationAgreementHash}
                getTags={getReservationAgreementTags}
                outputFilename="reservation_agreement"
              >
                Reservation Agreement
              </DownloadDocumentLink>
            </div>
          </div>}
      </div>
    );
  }
}

function mapStateToProps(state: IAppState) {
  return {
    isLoading: selectLoading(state.aftermathState),
    lockedAmount: selectLockedAmount(state.aftermathState),
    neumarkBalance: selectNeumarkBalance(state.aftermathState),
    unlockDate: selectUnlockDate(state.aftermathState),
    reservationAgreementHash: selectReservationAgreementHash(state.legalAgreementState),
    tokenHolderAgreementHash: selectTokenHolderAgreementHash(state.legalAgreementState),
    showDocuments: selectShowDocuments(state.aftermathState),
  };
}

function mapDispatchToProps(dispatch: Dispatch<any>) {
  return {
    loadAftermathDetails: (address: string) => dispatch(loadAftermathDetails(address)),
    getTokenHolderAgreementTags: () => dispatch(getTokenHolderAgreementTags),
    getReservationAgreementTags: () => dispatch(getReservationAgreementTags),
  };
}

export default connect<any, any, IAftermathOwnProps>(mapStateToProps, mapDispatchToProps)(
  CommitKnownUserAftermath
);
