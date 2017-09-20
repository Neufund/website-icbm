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
  estimationCoefficient?: number;
  submitFunds: (value: string) => void;
}

export const CommitKnownUser: React.SFC<ICommitKnownUser> = ({
  userAddress,
  contractAddress,
  transactionPayload,
  estimationCoefficient,
  submitFunds,
}) =>
  <div>
    <Row>
      <Col sm={6}>
        <UserAddressComponent address={userAddress} />
      </Col>
    </Row>
    <Row className={style.formRow}>
      <Col sm={6}>
        <CommitKnownUserForm
          estimationCoefficient={estimationCoefficient}
          onSubmit={values => submitFunds(values.ethAmount)}
        />
      </Col>
      <Col sm={6}>
        <CommitKnownUserDesc
          contractAddress={contractAddress}
          transactionPayload={transactionPayload}
        />
      </Col>
    </Row>
  </div>;
