import * as React from "react";
import { Col, Row } from "react-bootstrap";
import { CommitFundsDescription } from "./CommitFundsDescription";
import CommitFundsForm from "./CommitFundsForm";
import * as style from "./CommitFundsWeb3.scss";
import { UserAddressComponent } from "./UserAddressComponent";

interface ICommitFundsWeb3 {
  userAddress: string;
  contractAddress: string;
  transactionPayload: string;
  estimationCoefficient?: number;
}

export const CommitFundsWeb3: React.SFC<ICommitFundsWeb3> = ({
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
      <Col sm={6}>
        <CommitFundsForm estimationCoefficient={estimationCoefficient} />
      </Col>
      <Col sm={6}>
        <CommitFundsDescription
          contractAddress={contractAddress}
          transactionPayload={transactionPayload}
        />
      </Col>
    </Row>
  </div>;
