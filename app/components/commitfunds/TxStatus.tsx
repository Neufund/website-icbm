import { FontIcon } from "material-ui";
import * as React from "react";

import { EtherScanLinkType } from "../../actions/constants";
import EtherScanLink from "../EtherScanLink";
import { LoadingIndicator } from "../LoadingIndicator";
import { CommitHeaderComponent } from "./CommitHeaderComponent";

import { connect } from "react-redux";
import { Link } from "react-router";
import { watchTxBeingMined } from "../../actions/submitFunds";
import { IAppState } from "../../reducers/index";
import * as styles from "./TxStatus.scss";

interface ITxMiningComponent {
  params: { txHash: string };
  isMined: boolean;
  currentBlockNumber: number;
  address: string;

  watchTx: () => any;
}

const iconStyles = {
  width: "64px",
  height: "64px",
  fontSize: "64px",
};

export class TxStatusComponent extends React.Component<ITxMiningComponent> {
  public componentDidMount() {
    this.props.watchTx();
  }

  public render() {
    const { txHash } = this.props.params;
    const { isMined, currentBlockNumber, address } = this.props;
    return (
      <div>
        <CommitHeaderComponent number="03" title="Transaction status" />

        <p>
          Your transaction
          <EtherScanLink
            target="_blank"
            linkType={EtherScanLinkType.TRANSACTION}
            resourceId={txHash}
            className={styles.tx}
          />
          is {isMined ? "ready. " : "being mined."}
        </p>

        <div>
          <div>
            Block number:
            <EtherScanLink
              target="_blank"
              linkType={EtherScanLinkType.BLOCK}
              resourceId={currentBlockNumber}
            />
          </div>

          <div>
            Transaction confirmed: <b>{isMined ? "Yes" : "No"}</b>
          </div>
        </div>

        <div className={styles.confirmedIndicator}>
          {isMined
            ? <FontIcon className="material-icons" style={iconStyles}>
                done
              </FontIcon>
            : <LoadingIndicator />}
        </div>

        {isMined &&
          <Link
            to={`/commit/status/${address}`}
            className="btn btn-primary btn-link pull-right"
            data-test-id="aftermath-link"
          >
            See your commitment
          </Link>}
      </div>
    );
  }
}

export const TxStatus = connect(
  (state: IAppState) => ({
    currentBlockNumber: state.transactionState.blockCurrent,
    isMined: state.transactionState.txConfirmed,
    address: state.userState.address,
  }),
  (dispatcher, ownProps: any) => ({
    watchTx: () => dispatcher(watchTxBeingMined(ownProps.params.txHash)),
  })
)(TxStatusComponent);
