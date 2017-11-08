import { FontIcon } from "material-ui";
import * as React from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { Dispatch } from "redux";

import { EtherScanLinkType } from "../../actions/constants";
import { transactionResetAction } from "../../actions/submitFunds";
import { IAppState } from "../../reducers/index";
import { ITransactionState } from "../../reducers/transactionState";
import EtherScanLink from "../EtherScanLink";
import { LoadingIndicator } from "../LoadingIndicator";
import * as styles from "./TransactionConfirmation.scss";

const TxSigningComponent: React.SFC<{ handleBackClick: () => void }> = ({ handleBackClick }) =>
  <div>
    <p>
      Please confirm transaction using signer or{" "}
      <a href="#" onClick={handleBackClick}>
        back to change your commit
      </a>.
    </p>
    <LoadingIndicator className={styles.loadingIndicator} />
    <p className={styles.waitingDesc}>Waiting for signing and sending to eth node.</p>
  </div>;

function mapDispatchToPropsTxSigning(dispatch: Dispatch<any>) {
  return {
    handleBackClick: (e: any) => {
      e.preventDefault();
      dispatch(transactionResetAction());
    },
  };
}

const TxSigning = connect(null, mapDispatchToPropsTxSigning)(TxSigningComponent);

const TxMiningComponent: React.SFC<{ txHash: string; blockCurrent: number }> = ({
  txHash,
  blockCurrent,
}) =>
  <div>
    <p>
      You transaction {" "}
      <EtherScanLink
        target="_blank"
        linkType={EtherScanLinkType.TRANSACTION}
        resourceId={txHash}
        className={styles.tx}
      />{" "}
      is ready.
    </p>
    <p>
      Block number: <b>{blockCurrent}</b>
      <br />
      Transaction confirmed: <b>No</b>
    </p>
    <LoadingIndicator className={styles.loadingIndicator} />
    <p className={styles.waitingDesc}>Waiting for confirmation from network</p>
  </div>;

const iconStyles = {
  width: "64px",
  height: "64px",
  fontSize: "64px",
};

const TxSummaryComponent: React.SFC<{
  txHash: string;
  blockOfConfirmation: number;
  generatedNEU: string;
}> = ({ txHash, blockOfConfirmation }) =>
  <div>
    <p>
      You transaction{" "}
      <EtherScanLink
        target="_blank"
        linkType={EtherScanLinkType.TRANSACTION}
        resourceId={txHash}
        className={styles.tx}
      />{" "}
      is ready.
    </p>
    <p>
      Block number:{" "}
      <EtherScanLink
        target="_blank"
        linkType={EtherScanLinkType.BLOCK}
        resourceId={blockOfConfirmation}
      />
      <br />
      Transaction confirmed: <b>Yes</b>
    </p>
    <div className={styles.confirmedIndicator}>
      <FontIcon className="material-icons" style={iconStyles}>
        done
      </FontIcon>
    </div>
    <p className={styles.waitingDesc}>Transaction confirmed</p>
  </div>;

interface ITransactionConfirmationExtras {
  handleGoToAftermathButton: () => void;
  handleTransactionResetButton: () => void;
}

export const TransactionConfirmationComponent: React.SFC<
  ITransactionState & ITransactionConfirmationExtras
> = ({
  txHash,
  blockOfConfirmation,
  blockCurrent,
  txConfirmed,
  error,
  generatedNEU,
  handleGoToAftermathButton,
  handleTransactionResetButton,
}) =>
  <div>
    {error !== null &&
      <div>
        <div className={styles.error}>
          {error}
        </div>
        <Button bsStyle="primary" onClick={handleTransactionResetButton}>
          reset transaction
        </Button>
      </div>}
    {txHash === null && <TxSigning />}
    {txHash !== null &&
      !txConfirmed &&
      <TxMiningComponent txHash={txHash} blockCurrent={blockCurrent} />}
    {txConfirmed &&
      <TxSummaryComponent
        txHash={txHash}
        blockOfConfirmation={blockOfConfirmation}
        generatedNEU={generatedNEU}
      />}
    {txConfirmed &&
      <div className={styles.goAftermath}>
        <Button bsStyle="primary" onClick={handleGoToAftermathButton}>
          see aftermath page
        </Button>
      </div>}
  </div>;

const mapStateToProps = (state: IAppState) => ({
  txHash: state.transactionState.txHash,
  blockOfConfirmation: state.transactionState.blockOfConfirmation,
  blockCurrent: state.transactionState.blockCurrent,
  txConfirmed: state.transactionState.txConfirmed,
  error: state.transactionState.error,
  generatedNEU: state.transactionState.generatedNEU,
});

function mapDispatchToProps(dispatch: Dispatch<any>) {
  return {
    handleTransactionResetButton: () => {
      dispatch(transactionResetAction());
    },
    handleGoToAftermathButton: () => {
      dispatch(transactionResetAction());
      dispatch(push("/commit/aftermath"));
    },
  };
}

export const TransactionConfirmation = connect(mapStateToProps, mapDispatchToProps)(
  TransactionConfirmationComponent
);
