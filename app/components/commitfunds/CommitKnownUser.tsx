import * as React from "react";
import { Col, Row } from "react-bootstrap";
import { UserAddressComponent } from "../UserAddressComponent";
import * as style from "./CommitKnownUser.scss";
import { CommitKnownUserDesc } from "./CommitKnownUserDesc";
import CommitKnownUserForm from "./CommitKnownUserForm";

interface ICommitKnownUser {
  userAddress: string;
  contractAddress: string;
  transactionPayload: string;
  estimationCoefficient?: number;
}

export const CommitKnownUser: React.SFC<ICommitKnownUser> = ({
  userAddress,
  contractAddress,
  transactionPayload,
  estimationCoefficient,
}) =>
  <div>
    <Row>
      <Col sm={6}>
        <UserAddressComponent address={userAddress} />
      </Col>
    </Row>
    <Row className={style.formRow}>
      <Col sm={7} md={6}>
        <CommitKnownUserForm estimationCoefficient={estimationCoefficient} />
      </Col>
      <Col sm={5} md={6}>
        <CommitKnownUserDesc
          contractAddress={contractAddress}
          transactionPayload={transactionPayload}
        />
      </Col>
    </Row>
  </div>;
