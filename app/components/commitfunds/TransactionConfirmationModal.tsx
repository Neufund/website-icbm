import * as React from "react";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";

import { IAppState } from "../../reducers/index";
import { ITransactionState } from "../../reducers/transactionState";
import EtherScanTxLink from "../EtherScanTxLink";
import { LoadingIndicator } from "../LoadingIndicator";
import SignInstruction from "./SignInstruction";
import * as styles from "./TransactionConfirmationModal.scss";

// tslint:disable-next-line
const noop = () => {};

interface IBlockHistoryComponent {
  blockHistory: Array<{ blockNo: number; confirmedTx: boolean }>;
}

const BlockHistoryComponent: React.SFC<IBlockHistoryComponent> = ({ blockHistory }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>block number</th>
          <th>transaction confirmed</th>
        </tr>
      </thead>
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
    </table>
  );
};

interface IConfirmationComponent {
  txHash: string;
  blockOfConfirmation: number;
}

const ConfirmationComponent: React.SFC<IConfirmationComponent> = ({
  txHash,
  blockOfConfirmation,
}) =>
  <div className={styles.confirmation}>
    {txHash} | {blockOfConfirmation}
  </div>;

export const TransactionConfirmationModalComponent: React.SFC<ITransactionState> = ({
  txStarted,
  txHash,
  blockOfConfirmation,
  blockHistory,
  txConfirmed,
  error,
}) => {
  return (
    <Modal
      show={txStarted === true}
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
              You transaction <EtherScanTxLink tx={txHash} /> is ready. Now we are waiting for
              confirmation from network
            </div>
            {blockHistory.length > 0 && <BlockHistoryComponent blockHistory={blockHistory} />}
          </div>}
        {txConfirmed &&
          <ConfirmationComponent txHash={txHash} blockOfConfirmation={blockOfConfirmation} />}
        {error !== null &&
          <div className={styles.error}>
            {error}
          </div>}
      </Modal.Body>
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

export default connect(mapStateToProps)(TransactionConfirmationModalComponent);
