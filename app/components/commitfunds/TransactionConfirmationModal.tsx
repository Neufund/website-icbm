import * as React from "react";
import { Modal } from "react-bootstrap";
import config from "../../config";
import { ITransactionState } from "../../reducers/transactionState";
import * as styles from "./TransactionConfirmationModal.scss";

// tslint:disable-next-line
const noop = () => {};

export const TransactionConfirmationModal: React.SFC<ITransactionState> = ({
  txStarted,
  txHash,
  blockOfConfirmation,
  currentBlock,
  error,
}) => {
  const confirmMsg = <div>Please confirm transaction using signer</div>;
  const txNumber = (
    <div>
      Transaction {txHash} ready waiting for confirmations
    </div>
  );
  const confNo = currentBlock - blockOfConfirmation;
  const confirmations = (
    <div>{`Got ${confNo} of ${config.contractsDeployed
      .numberOfConfirmations} required confirmations`}</div>
  );

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
        {txHash === null ? confirmMsg : txNumber}
        {blockOfConfirmation !== null && confirmations}
        {error !== null &&
          <div className={styles.error}>
            {error}
          </div>}
      </Modal.Body>
    </Modal>
  );
};
