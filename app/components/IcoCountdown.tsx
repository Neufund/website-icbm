import * as moment from "moment";
import * as React from "react";
import { Col, Row } from "react-bootstrap";

import { Countdown } from "../components/Countdown";
import { HexagonsStack } from "../components/HexagonsStack";
import { IncentiveText } from "../components/IncentiveText";

import * as styles from "../components/Incentive.scss";

interface IIcoCountdownProps {
  startDate: moment.Moment;
  onFinish?: () => {};
}

export const CountdownHexagonText: React.SFC<IIcoCountdownProps> = ({ startDate, onFinish }) =>
  <div className={styles.countdown}>
    <h3>ICBM STARTS:</h3>
    <h1>
      {startDate.utc().format("Do MMM. YYYY")}
    </h1>

    <h2 className={styles.icoTimeStart}>
      {startDate.utc().format("hh:mm a")} <span className={styles.timezone}>UTC</span>
    </h2>

    <div className={styles.timeLeft}>
      <h3>TIME LEFT:</h3>
      <div className={styles.countDownContainer}>
        <Countdown finishDate={startDate} onFinish={onFinish} />
      </div>
    </div>
  </div>;

export const IcoCountdown: React.SFC<IIcoCountdownProps> = props =>
  <Row>
    <IncentiveText />
    <Col sm={6} xsHidden>
      <HexagonsStack className={styles.hexagons} width={480} height={480}>
        <CountdownHexagonText {...props} />
      </HexagonsStack>
    </Col>
    <Col className="hexagon-mobile" sm={6} smHidden mdHidden lgHidden>
      <CountdownHexagonText {...props} />
    </Col>
  </Row>;
