import { noop } from "lodash";
import * as React from "react";
import { Button, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { Dispatch } from "redux";

import { EtherScanLinkType } from "../../actions/constants";
import { transactionResetAction } from "../../actions/submitFunds";
import { IAppState } from "../../reducers/index";
import { ITransactionState } from "../../reducers/transactionState";
import EtherScanLink from "../EtherScanLink";
import { LoadingIndicator } from "../LoadingIndicator";
import SignInstruction from "./SignInstruction";
import * as styles from "./TransactionConfirmationModal.scss";

interface IBlockHistoryComponent {
  blockHistory: Array<{ blockNo: number; confirmedTx: boolean }>;
}

const BlockHistoryComponent: React.SFC<IBlockHistoryComponent> = ({ blockHistory }) => {
  return (
    <table className={styles.blockHistory}>
      <thead>
        <tr>
          <th>block number</th>
          <th>transaction confirmed</th>
        </tr>
      </thead>
      <tbody>
        {blockHistory.map(block =>
          <tr key={block.blockNo}>
            <td>
              {block.blockNo}
            </td>
            <td>
              {block.confirmedTx ? "yes" : "no"}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

interface ITransactionSummaryComponent {
  txHash: string;
  blockOfConfirmation: number;
}

const TransactionSummaryComponent: React.SFC<ITransactionSummaryComponent> = ({
  txHash,
  blockOfConfirmation,
}) =>
  <div className={styles.confirmation}>
    Your transaction{" "}
    <EtherScanLink
      target="_blank"
      linkType={EtherScanLinkType.TRANSACTION}
      resourceId={txHash}
    />{" "}
    has been mined in block:{" "}
    <EtherScanLink
      target="_blank"
      linkType={EtherScanLinkType.BLOCK}
      resourceId={blockOfConfirmation}
    />
  </div>;

interface ITransactionConfirmationModalExtras {
  handleGoToAftermathButton: () => void;
}

export const TransactionConfirmationModalComponent: React.SFC<
  ITransactionState & ITransactionConfirmationModalExtras
> = ({
  txStarted,
  txHash,
  blockOfConfirmation,
  blockHistory,
  txConfirmed,
  error,
  handleGoToAftermathButton,
}) => {
  return (
    <Modal
      show={txStarted}
      onHide={noop}
      bsSize="large"
      animation={false}
      data-test-id="transaction-status-modal"
    >
      <Modal.Header>
        <Modal.Title>Transaction status</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {txHash === null && <SignInstruction />}
        {txHash !== null &&
          !txConfirmed &&
          <div>
            <LoadingIndicator className={styles.loadingIndicator} />
            <div className={styles.transactionNumber}>
              You transaction{" "}
              <EtherScanLink linkType={EtherScanLinkType.TRANSACTION} resourceId={txHash} /> is
              ready. Now we are waiting for confirmation from network.
            </div>
            {blockHistory.length > 0 && <BlockHistoryComponent blockHistory={blockHistory} />}
          </div>}
        {txConfirmed &&
          <TransactionSummaryComponent txHash={txHash} blockOfConfirmation={blockOfConfirmation} />}
        {error !== null &&
          <div className={styles.error}>
            {error}
          </div>}
      </Modal.Body>
      {txConfirmed &&
        <Modal.Footer>
          <Button bsStyle="primary" onClick={handleGoToAftermathButton}>
            see aftermath page
          </Button>
        </Modal.Footer>}
    </Modal>
  );
};

const mapStateToProps = (state: IAppState): ITransactionState => ({
  txStarted: state.transactionState.txStarted,
  txHash: state.transactionState.txHash,
  blockOfConfirmation: state.transactionState.blockOfConfirmation,
  blockHistory: state.transactionState.blockHistory,
  txConfirmed: state.transactionState.txConfirmed,
  error: state.transactionState.error,
});

function mapDispatchToProps(dispatch: Dispatch<any>) {
  return {
    handleGoToAftermathButton: () => {
      dispatch(transactionResetAction());
      dispatch(push("/commit/aftermath"));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionConfirmationModalComponent);
