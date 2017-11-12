import { BigNumber } from "bignumber.js";
import * as React from "react";
import { Col, Row } from "react-bootstrap";
import { connect } from "react-redux";

import { debounce } from "lodash";
import { calculateEstimatedReward, submitFunds } from "../../actions/submitFunds";
import config from "../../config";
import {
  selectEstimatedReward,
  selectEstimatedRewardLoadingState,
  selectMinTicketWei,
} from "../../reducers/commitmentState";
import { IAppState } from "../../reducers/index";
import { selectBalance } from "../../reducers/userState";
import { UserInfo } from "../UserInfo";
import * as style from "./CommitKnownUser.scss";
import CommitKnownUserForm, { ICommitKnownUserFormValues } from "./CommitKnownUserForm";

interface ICommitKnownUser {
  submitFunds: (values: ICommitKnownUserFormValues) => any;
  calculateEstimatedReward: () => any;
  contractAddress: string;
  transactionPayload: string;
  minTicketWei: BigNumber;
  estimatedReward: BigNumber;
  loadingEstimatedReward: boolean;
  balance: BigNumber;
}

export const CommitKnownUserComponent: React.SFC<ICommitKnownUser> = ({
  submitFunds,
  minTicketWei,
  calculateEstimatedReward,
  estimatedReward,
  loadingEstimatedReward,
  balance,
}) =>
  <div>
    <Row>
      <UserInfo />
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
    contractAddress: config.contractsDeployed.commitmentContractAddress,
    minTicketWei: selectMinTicketWei(state.commitmentState),
    estimatedReward: selectEstimatedReward(state.commitmentState),
    loadingEstimatedReward: selectEstimatedRewardLoadingState(state.commitmentState),
    balance: selectBalance(state.userState),
  }),
  dispatch => ({
    submitFunds: (values: ICommitKnownUserFormValues) => dispatch(submitFunds(values.ethAmount)),
    calculateEstimatedReward: debounce(
      () => dispatch(calculateEstimatedReward) as () => {},
      300
    ) as () => {},
  })
)(CommitKnownUserComponent);
