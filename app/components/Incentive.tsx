import * as React from "react";
import { Grid, Row, Col, Button } from "react-bootstrap";

import { HexagonsStack } from "./HexagonsStack";

import * as styles from "./Incentive.scss";

export const Incentive: React.SFC = () =>
  <Row>
    <Col sm={6} className={styles.incentive}>
      <h1>Community owned investment ecosystem</h1>

      <p>
        Commit funds to invest in the future. As a reward for early participation you will get a
        token (neumark) representing the platform’s ownership.
      </p>
      <p>For more information on the commitment process and its legal aspects read the FAQ</p>

      <Button bsStyle="primary" className="comming-soon">How to participate</Button>
    </Col>
    <Col sm={6}>
      <HexagonsStack className={styles.hexagons}>
        <p>Commitment Opportunity starts in:</p>
        <h1>Future</h1>
      </HexagonsStack>
    </Col>
  </Row>;
