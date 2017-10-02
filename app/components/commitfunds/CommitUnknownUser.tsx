import { BigNumber } from "bignumber.js";
import * as React from "react";
import { Col, Row } from "react-bootstrap";
import { IconLink } from "../IconLink";
import * as style from "./CommitUnknownUser.scss";
import { CommitUnknownUserDesc } from "./CommitUnknownUserDesc";
import CommitUnknownUserEstimation from "./CommitUnknownUserEstimation";

interface ICommitFundsStatic {
  contractAddress: string;
  transactionPayload: string;
  gasPrice: string;
  gasLimit: string;
  estimatedReward: BigNumber;
  loadingEstimatedReward: boolean;
  calculateEstimatedRewardAction: () => {};
  minTicketWei: BigNumber;
}

export const CommitUnknownUser: React.SFC<ICommitFundsStatic> = ({
  contractAddress,
  transactionPayload,
  gasPrice,
  gasLimit,
  estimatedReward,
  loadingEstimatedReward,
  calculateEstimatedRewardAction,
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
        />
      </Col>
      <Col sm={4}>
        <CommitUnknownUserEstimation
          estimatedReward={estimatedReward}
          calculateEstimatedReward={calculateEstimatedRewardAction}
          loadingEstimatedReward={loadingEstimatedReward}
          minTicketWei={minTicketWei}
        />
      </Col>
    </Row>
  </div>;
