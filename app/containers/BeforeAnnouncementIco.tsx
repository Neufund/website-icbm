import * as React from "react";
import { Col, Row } from "react-bootstrap";

import { HexagonsStack } from "../components/HexagonsStack";
import { IncentiveText } from "../components/IncentiveText";

import * as styles from "../components/Incentive.scss";

const HexagonText: React.SFC = () =>
  <div className={styles.pulldown}>
    <p className={styles.goto}>Starts in:</p>
    <h1 className={styles.time}>
      Autumn<br />2017
    </h1>
  </div>;

const BeforeAnnouncementIco: React.SFC = () =>
  <Row>
    <IncentiveText />
    <Col sm={6} xsHidden>
      <HexagonsStack className={styles.hexagons}>
        <HexagonText />
      </HexagonsStack>
    </Col>
    <Col className="hexagon-mobile" sm={6} smHidden mdHidden lgHidden>
      <HexagonText />
    </Col>
  </Row>;

export default BeforeAnnouncementIco;
