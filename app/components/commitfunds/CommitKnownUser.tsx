import { BigNumber } from "bignumber.js";
import * as React from "react";
import { Col, Row } from "react-bootstrap";
import { connect } from "react-redux";

import { debounce } from "lodash";
import { InvestorType, Web3Type } from "../../actions/constants";
import { calculateEstimatedReward, submitFunds } from "../../actions/submitFunds";
import config from "../../config";
import {
  selectEstimatedReward,
  selectEstimatedRewardLoadingState,
  selectMinTicketWei,
} from "../../reducers/commitmentState";
import { IAppState } from "../../reducers/index";
import { selectBalance, selectReservedTicket } from "../../reducers/userState";
import { UserAddressComponent } from "../UserAddressComponent";
import * as style from "./CommitKnownUser.scss";
import CommitKnownUserForm, { ICommitKnownUserFormValues } from "./CommitKnownUserForm";

interface ICommitKnownUser {
  submitFunds: (values: ICommitKnownUserFormValues) => any;
  calculateEstimatedReward: () => any;
  userAddress: string;
  contractAddress: string;
  transactionPayload: string;
  minTicketWei: BigNumber;
  estimatedReward: BigNumber;
  loadingEstimatedReward: boolean;
  balance: BigNumber;
  web3Provider: Web3Type;
  investorType: InvestorType;
  reservedTicket: BigNumber;
}

export const CommitKnownUserComponent: React.SFC<ICommitKnownUser> = ({
  userAddress,
  submitFunds,
  minTicketWei,
  calculateEstimatedReward,
  estimatedReward,
  loadingEstimatedReward,
  balance,
  web3Provider,
  investorType,
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
  </div>;

export const CommitKnownUser = connect(
  (state: IAppState) => ({
    userAddress: state.userState.address,
    contractAddress: config.contractsDeployed.commitmentContractAddress,
    minTicketWei: selectMinTicketWei(state.commitmentState),
    estimatedReward: selectEstimatedReward(state.commitmentState),
    loadingEstimatedReward: selectEstimatedRewardLoadingState(state.commitmentState),
    balance: selectBalance(state.userState),
    web3Provider: state.web3State.web3Type,
    investorType: state.userState.investorType,
    reservedTicket: selectReservedTicket(state.userState),
  }),
  dispatch => ({
    submitFunds: (values: ICommitKnownUserFormValues) => dispatch(submitFunds(values.ethAmount)),
    calculateEstimatedReward: debounce(
      () => dispatch(calculateEstimatedReward) as () => {},
      300
    ) as () => {},
  })
)(CommitKnownUserComponent);
