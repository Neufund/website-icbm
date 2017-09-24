import { BigNumber } from "bignumber.js";
import * as React from "react";
import { Col, Row } from "react-bootstrap";
import { UserAddressComponent } from "../UserAddressComponent";
import * as style from "./CommitKnownUser.scss";
import { CommitKnownUserDesc } from "./CommitKnownUserDesc";
import CommitKnownUserForm, { ICommitKnownUserFormValues } from "./CommitKnownUserForm";

interface ICommitKnownUser {
  userAddress: string;
  contractAddress: string;
  transactionPayload: string;
  minTicketWei: BigNumber;
  submitFunds: (values: ICommitKnownUserFormValues) => void;
  calculateEstimatedReward?: () => {};
  estimatedReward: BigNumber;
  loadingEstimatedReward: boolean;
}

export const CommitKnownUser: React.SFC<ICommitKnownUser> = ({
  userAddress,
  contractAddress,
  transactionPayload,
  submitFunds,
  minTicketWei,
  calculateEstimatedReward,
  estimatedReward,
  loadingEstimatedReward,
}) =>
  <div>
    <Row>
      <Col sm={6}>
        <UserAddressComponent address={userAddress} />
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
        />
      </Col>
      <Col sm={5} md={6}>
        <CommitKnownUserDesc
          contractAddress={contractAddress}
          transactionPayload={transactionPayload}
        />
      </Col>
    </Row>
  </div>;
