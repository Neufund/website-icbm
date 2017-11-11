import * as React from "react";
import { Alert } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router";

import { IAppState } from "../../reducers/index";
import { LoadingIndicator } from "../LoadingIndicator";
import { UserInfo } from "../UserInfo";
import { CommitHeaderComponent } from "./CommitHeaderComponent";
import { TransactionCommittedMoneyComponent } from "./TransactionCommittedMoneyComponent";

import * as styles from "./TxConfirmation.scss";

interface ITxConfirmationComponentProps {
  errorMsg: string;
  committedETH: string;
  estimatedNEU: string;
}

export class TxConfirmationComponent extends React.Component<ITxConfirmationComponentProps> {
  public render() {
    const errorMsg = this.props.errorMsg;
    const committedETH = this.props.committedETH;
    const estimatedNEU = this.props.estimatedNEU;

    return (
      <div>
        <CommitHeaderComponent number="02" title="Confirm transaction" />
        <UserInfo />
        <p className={styles.text}>
          Please confirm your transcation using signer or{" "}
          <Link to="/commit">go back to change your commit</Link>.
        </p>
        {!errorMsg &&
          <div className={styles.confirmationLoadingIndicator}>
            <LoadingIndicator />
            <p>Waiting for confirmation from signer</p>
          </div>}
        {errorMsg &&
          <div className={styles.error}>
            <Alert bsStyle="danger">
              <h4>Error occured!</h4>
              <p>
                {errorMsg}
              </p>
            </Alert>
            <Link to={"/commit"} className="btn btn-primary btn-link">
              Go back to start
            </Link>
          </div>}
        <TransactionCommittedMoneyComponent commit={committedETH} reward={estimatedNEU} />
      </div>
    );
  }
}

export const TxConfirmation = connect((state: IAppState) => ({
  errorMsg: state.transactionState.error,
  committedETH: state.transactionState.committedETH,
  estimatedNEU: state.transactionState.estimatedNEU,
}))(TxConfirmationComponent);
