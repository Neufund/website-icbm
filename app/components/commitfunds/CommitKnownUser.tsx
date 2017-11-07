import { BigNumber } from "bignumber.js";
import * as React from "react";
import { Col, Row } from "react-bootstrap";
import { connect } from "react-redux";

import { InvestorType, Web3Type } from "../../actions/constants";
import { IAppState } from "../../reducers/index";
import { UserAddressComponent } from "../UserAddressComponent";
import * as style from "./CommitKnownUser.scss";
import CommitKnownUserForm, { ICommitKnownUserFormValues } from "./CommitKnownUserForm";
import { TransactionConfirmation } from "./TransactionConfirmation";

interface ICommitKnownUser {
  userAddress: string;
  contractAddress: string;
  transactionPayload: string;
  minTicketWei: BigNumber;
  submitFunds: (values: ICommitKnownUserFormValues) => void;
  calculateEstimatedReward?: () => {};
  estimatedReward: BigNumber;
  loadingEstimatedReward: boolean;
  balance: BigNumber;
  web3Provider: Web3Type;
  investorType: InvestorType;
  reservedTicket: BigNumber;
}

export const CommitKnownUserComponent: React.SFC<IMapStateToProps & ICommitKnownUser> = ({
  userAddress,
  submitFunds,
  minTicketWei,
  calculateEstimatedReward,
  estimatedReward,
  loadingEstimatedReward,
  balance,
  web3Provider,
  investorType,
  showTransactionConfirmation,
  reservedTicket,
}) =>
  <div>
    <Row>
      <Col sm={6}>
        <UserAddressComponent
          address={userAddress}
          balance={balance}
          web3Provider={web3Provider}
          investorType={investorType}
          reservedTicket={reservedTicket}
        />
      </Col>
    </Row>
    <Row className={style.formRow}>
      <Col sm={7} md={6}>
        <CommitKnownUserForm
          minTicketWei={minTicketWei}
          calculateEstimatedReward={calculateEstimatedReward}
          onSubmit={submitFunds}
          estimatedReward={estimatedReward}
          loadingEstimatedReward={loadingEstimatedReward}
          userBalance={balance}
        />
      </Col>
    </Row>
    {showTransactionConfirmation &&
      <Row>
        <Col xs={12}>
          <TransactionConfirmation />
        </Col>
      </Row>}
  </div>;

interface IMapStateToProps {
  showTransactionConfirmation: boolean;
}

const mapStateToProps = (state: IAppState) => ({
  showTransactionConfirmation: state.transactionState.txStarted,
});

export const CommitKnownUser = connect<IMapStateToProps, null, ICommitKnownUser>(
  mapStateToProps,
  {}
)(CommitKnownUserComponent);
