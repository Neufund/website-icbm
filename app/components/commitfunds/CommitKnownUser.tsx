import { BigNumber } from "bignumber.js";
import * as React from "react";
import { Col, Row } from "react-bootstrap";
import { connect } from "react-redux";

import { debounce } from "lodash";
import { calculateEstimatedReward, submitFunds } from "../../actions/submitFunds";
import { formatMoney } from "../../agreements/utils";
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
  minTicketEth: string;
  estimatedReward: BigNumber;
  loadingEstimatedReward: boolean;
  balance: BigNumber;
}

export const CommitKnownUserComponent: React.SFC<ICommitKnownUser> = ({
  submitFunds,
  minTicketEth,
  calculateEstimatedReward,
  estimatedReward,
  loadingEstimatedReward,
  balance,
}) =>
  <div>
    <Row>
      <Col sm={6}>
        <UserInfo />
      </Col>
    </Row>
    <Row className={style.formRow}>
      <Col sm={7} md={6}>
        <CommitKnownUserForm
          minTicketEth={minTicketEth}
          calculateEstimatedReward={calculateEstimatedReward}
          onSubmit={submitFunds}
          estimatedReward={estimatedReward}
          loadingEstimatedReward={loadingEstimatedReward}
        />
      </Col>
    </Row>
  </div>;

export const CommitKnownUser = connect(
  (state: IAppState) => ({
    contractAddress: config.contractsDeployed.commitmentContractAddress,
    minTicketEth: formatMoney(
      state.commitmentState.ethDecimals,
      selectMinTicketWei(state.commitmentState),
      1
    ),
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
