import * as React from "react";
import { Col, Row } from "react-bootstrap";

import * as styles from "./DuringIcoCountdown.scss";
import { MailchimpForm } from "./MailchimpForm";

export const AfterIcoSumup = () => {
  return (
    <Row className={`${styles.duringIco}`} data-test-id="during-ico-phase">
      <Col sm={5} className={styles.incentive}>
        <h1>Unlock your commitment below</h1>

        <p>
          Thank you for joining ICBM! You can unlock your funds by following the instructions under
          'See your commitment status'
        </p>

        <p></p>

        <MailchimpForm hideForm />

        <a href="/commit/status" className="btn btn-primary btn-link">
          See your commitment status
        </a>
      </Col>
    </Row>
  );
};
