import * as moment from "moment";
import * as React from "react";
import { Col, Row } from "react-bootstrap";

import { Countdown } from "../components/Countdown";
import { HexagonsStack } from "../components/HexagonsStack";
import { IncentiveText } from "../components/IncentiveText";

import * as styles from "../components/Incentive.scss";

interface IIcoCountdownProps {
  startDate: moment.Moment;
}

const HexagonText: React.SFC<IIcoCountdownProps> = ({ startDate }) =>
  <div className={styles.countdown}>
    <h3>Commitment Opportunity starts in: </h3>
    <h1>Autumn</h1>
    <Countdown finishDate={startDate} />
    <h3>Reward starting point:</h3>
    <p>
      {" "}-- NEU / <strong>1</strong> EHT
    </p>
  </div>;

export const IcoCountdown: React.SFC<IIcoCountdownProps> = props =>
  <Row>
    <IncentiveText />
    <Col sm={6} xsHidden>
      <HexagonsStack className={styles.hexagons}>
        <HexagonText {...props} />
      </HexagonsStack>
    </Col>
    <Col className="hexagon-mobile" sm={6} smHidden mdHidden lgHidden>
      <HexagonText {...props} />
    </Col>
  </Row>;
