import { BigNumber } from "bignumber.js";
import * as React from "react";
import { Col, Row } from "react-bootstrap";
import { connect } from "react-redux";

import { debounce } from "lodash";
import { calculateEstimatedReward } from "../../actions/submitFunds";
import config from "../../config";
import {
  selectEstimatedReward,
  selectEstimatedRewardLoadingState,
  selectMinTicketWei,
} from "../../reducers/commitmentState";
import { IAppState } from "../../reducers/index";
import { publicCommitment } from "../../web3/contracts/ContractsRepository";
import { IconLink } from "../IconLink";
import * as style from "./CommitUnknownUser.scss";
import { CommitUnknownUserDesc } from "./CommitUnknownUserDesc";
import CommitUnknownUserEstimation from "./CommitUnknownUserEstimation";

interface ICommitFundsStatic {
  calculateEstimatedReward: () => {};
  contractAddress: string;
  transactionPayload: string;
  gasPrice: string;
  gasLimit: string;
  estimatedReward: BigNumber;
  loadingEstimatedReward: boolean;
  minTicketWei: BigNumber;
}

export const CommitUnknownUserComponent: React.SFC<ICommitFundsStatic> = ({
  contractAddress,
  transactionPayload,
  gasPrice,
  gasLimit,
  estimatedReward,
  loadingEstimatedReward,
  calculateEstimatedReward,
  minTicketWei,
}) =>
  <div>
    <Row className={style.initialLink}>
      <Col sm={12}>
        <IconLink url="/" text="New to the blockchain? Read “How to participate”" />
      </Col>
    </Row>
    <Row className={style.contentRow}>
      <Col sm={8}>
        <CommitUnknownUserDesc
          contractAddress={contractAddress}
          transactionPayload={transactionPayload}
          gasPrice={gasPrice}
          gasLimit={gasLimit}
          minTicketSize={minTicketWei}
        />
      </Col>
      <Col sm={4}>
        <CommitUnknownUserEstimation
          estimatedReward={estimatedReward}
          calculateEstimatedReward={calculateEstimatedReward}
          loadingEstimatedReward={loadingEstimatedReward}
          minTicketWei={minTicketWei}
        />
      </Col>
    </Row>
  </div>;

export const CommitUnknownUser = connect(
  (state: IAppState) => ({
    contractAddress: config.contractsDeployed.commitmentContractAddress,
    minTicketWei: selectMinTicketWei(state.commitmentState),
    estimatedReward: selectEstimatedReward(state.commitmentState),
    loadingEstimatedReward: selectEstimatedRewardLoadingState(state.commitmentState),
    transactionPayload: publicCommitment.rawWeb3Contract.commit.getData(),
    gasPrice: config.contractsDeployed.gasPrice,
    gasLimit: config.contractsDeployed.gasLimit,
  }),
  dispatch => ({
    calculateEstimatedReward: debounce(
      () => dispatch(calculateEstimatedReward) as () => {},
      300
    ) as () => {},
  })
)(CommitUnknownUserComponent);
