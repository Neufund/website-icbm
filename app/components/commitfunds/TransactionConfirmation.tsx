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
import SignInstruction from "./SignInstruction";
import * as styles from "./TransactionConfirmation.scss";

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
  generatedNEU: string;
}

const TransactionSummaryComponent: React.SFC<ITransactionSummaryComponent> = ({
  txHash,
  blockOfConfirmation,
  generatedNEU,
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
    <br />
    Neumark generated: {generatedNEU}
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
  blockHistory,
  txConfirmed,
  error,
  generatedNEU,
  handleGoToAftermathButton,
  handleTransactionResetButton,
}) => {
  const showLoading = generatedNEU === null && error === null;
  return (
    <div>
      <h2>Transaction status</h2>
      {error !== null &&
        <div>
          <div className={styles.error}>
            {error}
          </div>
          <Button bsStyle="primary" onClick={handleTransactionResetButton}>
            reset transaction
          </Button>
        </div>}
      {showLoading && <LoadingIndicator className={styles.loadingIndicator} />}
      {txHash === null && <SignInstruction />}
      {txHash !== null &&
        !txConfirmed &&
        <div>
          <div>
            You transaction{" "}
            <EtherScanLink linkType={EtherScanLinkType.TRANSACTION} resourceId={txHash} /> is ready.
            Now we are waiting for confirmation from network.
          </div>
          {blockHistory.length > 0 && <BlockHistoryComponent blockHistory={blockHistory} />}
        </div>}
      {txConfirmed &&
        <TransactionSummaryComponent
          txHash={txHash}
          blockOfConfirmation={blockOfConfirmation}
          generatedNEU={generatedNEU}
        />}
      {txConfirmed &&
        <Button bsStyle="primary" onClick={handleGoToAftermathButton}>
          see aftermath page
        </Button>}
    </div>
  );
};

const mapStateToProps = (state: IAppState) => ({
  txHash: state.transactionState.txHash,
  blockOfConfirmation: state.transactionState.blockOfConfirmation,
  blockHistory: state.transactionState.blockHistory,
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
