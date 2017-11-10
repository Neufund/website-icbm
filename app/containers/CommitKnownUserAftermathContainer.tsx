import { BigNumber } from "bignumber.js";
import { Moment } from "moment";
import * as React from "react";
import { connect, Dispatch } from "react-redux";

import { loadAftermathDetails } from "../actions/aftermathActions";
import { getReservationAgreementTags, getTokenHolderAgreementTags } from "../actions/getTags";
import { DownloadDocumentLink } from "../components/DownloadDocumentLink";
import EtherScanLink from "../components/EtherScanLink";
import { LoadingIndicator } from "../components/LoadingIndicator";
import MoneyComponent from "../components/MoneyComponent";
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

import { EtherScanLinkType, TokenType } from "../actions/constants";
import * as styles from "./Aftermath.scss";

interface IAftermathProps {
  isLoading: boolean;
  loadAftermathDetails: (address: string) => {};
  getTokenHolderAgreementTags: () => Promise<IDictionary>;
  getReservationAgreementTags: () => Promise<IDictionary>;
  lockedAmountEth: BigNumber;
  neumarkBalanceEth: BigNumber;
  unlockDateEth: Moment;
  reservationAgreementHash: string;
  tokenHolderAgreementHash: string;
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
      lockedAmountEth,
      unlockDateEth,
      neumarkBalanceEth,
      getTokenHolderAgreementTags,
      getReservationAgreementTags,
      reservationAgreementHash,
      tokenHolderAgreementHash,
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

        {lockedAmountEth &&
          <CommitmentInfo
            tokenType={TokenType.ETHER}
            lockedAmount={lockedAmountEth}
            neumarkBalance={neumarkBalanceEth}
            unlockDate={unlockDateEth}
            tokenHolderAgreementHash={tokenHolderAgreementHash}
            reservationAgreementHash={reservationAgreementHash}
            getTokenHolderAgreementTags={getTokenHolderAgreementTags}
            getReservationAgreementTags={getReservationAgreementTags}
          />}
      </div>
    );
  }
}

interface ICommitmentInfo {
  lockedAmount: BigNumber;
  unlockDate: Moment;
  neumarkBalance: BigNumber;
  tokenType: TokenType;
  reservationAgreementHash: string;
  tokenHolderAgreementHash: string;
  getTokenHolderAgreementTags: () => Promise<IDictionary>;
  getReservationAgreementTags: () => Promise<IDictionary>;
}

const CommitmentInfo: React.SFC<ICommitmentInfo> = ({
  lockedAmount,
  unlockDate,
  neumarkBalance,
  tokenType,
  tokenHolderAgreementHash,
  reservationAgreementHash,
  getTokenHolderAgreementTags,
  getReservationAgreementTags,
}) =>
  <div>
    <h4>Ether funds:</h4>
    <div className={styles.infoBox}>
      <div className={styles.caption}>Locked amount</div>
      <div className={styles.value}>
        {lockedAmount ? <MoneyComponent tokenType={tokenType} value={lockedAmount} /> : "-"}
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
        {neumarkBalance ? <MoneyComponent tokenType={TokenType.NEU} value={neumarkBalance} /> : "-"}
      </div>
    </div>
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
    </div>
  </div>;

function mapStateToProps(state: IAppState) {
  return {
    isLoading: selectLoading(state.aftermathState),
    lockedAmountEth: state.aftermathState.lockedAmountEth,
    neumarkBalanceEth: state.aftermathState.neumarkBalance,
    unlockDate: selectUnlockDate(state.aftermathState),
    reservationAgreementHash: selectReservationAgreementHash(state.legalAgreementState),
    tokenHolderAgreementHash: selectTokenHolderAgreementHash(state.legalAgreementState),
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
