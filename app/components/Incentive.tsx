import * as React from "react";
import { Grid, Row, Col, Button } from "react-bootstrap";

import { HexagonsStack } from "./HexagonsStack";

import * as styles from "./Incentive.scss";

export const HexagonText: React.SFC = () =>
  <div>
    <p className={styles.goto}>Starts in:</p>
    <h1 className={styles.time}>
      Autumn<br />2017
    </h1>
  </div>;

export const Incentive: React.SFC = () =>
  <Row>
    <Col sm={6} className={styles.incentive}>
      <h1>Community-owned Fundraising Platform</h1>

      <p>
        Neufund bridges blockchain and venture capital enabling ICOs for on- and off-chain startups.
      </p>
      <p>
        Reserve funds<sup>
          <a href="#commit">01</a>
        </sup>{" "}
        today for your future investments. Maintain full control of your investment decisions.
      </p>
      <p>
        Get Neumarks<sup>
          <a href="#commit">02</a>
        </sup>{" "}
        just by reserving funds and become a co-owner of the platform.
      </p>

      <Button bsStyle="primary" className="comming-soon">
        How to participate
      </Button>
    </Col>
    <Col sm={6} xsHidden>
      <HexagonsStack className={styles.hexagons}>
        <HexagonText />
      </HexagonsStack>
    </Col>
    <Col className="hexagon-mobile" sm={6} smHidden mdHidden lgHidden>
      <HexagonText />
    </Col>
  </Row>;
