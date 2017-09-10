import * as React from "react";
import { Col, Row } from "react-bootstrap";
import * as style from "./CommitFunds.scss";
import { CommitFundsDescription } from "./CommitFundsDescription";
import CommitFundsForm from "./CommitFundsForm";
import { UserAddressComponent } from "./UserAddressComponent";

export const CommitFunds: React.SFC = () => (
  <div>
    01
    <h2>Commit funds</h2>
    <Row>
      <Col sm={6}>
        <UserAddressComponent address="0x6ddfa40a2631348c2bd4b0c949ade1712b44587641c3309c5e8d2b914151ed50" />
      </Col>
    </Row>
    <Row className={style.formRow}>
      <Col md={6}>
        <CommitFundsForm />
      </Col>
      <Col md={6}>
        <CommitFundsDescription
          contractAddress="0x6895304785c271b827f1990860d5093e30d2a121"
          transactionPayload="0x3c7a3aff"
        />
      </Col>
    </Row>
  </div>
);
