import * as React from "react";
import { Col, Row } from "react-bootstrap";
import * as style from "./CommitFunds.scss";
import { CommitFundsDescription } from "./CommitFundsDescription";
import CommitFundsForm from "./CommitFundsForm";
import { UserAddressComponent } from "./UserAddressComponent";

interface ICommitFunds {
  userAddress: string;
  contractAddress: string;
  transactionPayload: string;
}

const CommitFunds: React.SFC<ICommitFunds> = ({
  userAddress,
  contractAddress,
  transactionPayload,
}) =>
  <div>
    <Row>
      <Col sm={6}>
        <UserAddressComponent address={userAddress} />
      </Col>
    </Row>
    <Row className={style.formRow}>
      <Col sm={6}>
        <CommitFundsForm />
      </Col>
      <Col sm={6}>
        <CommitFundsDescription
          contractAddress={contractAddress}
          transactionPayload={transactionPayload}
        />
      </Col>
    </Row>
  </div>;

export default CommitFunds;
