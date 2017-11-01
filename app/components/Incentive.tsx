import * as moment from "moment";
import * as React from "react";
import { Col, Row } from "react-bootstrap";

import { HexagonsStack } from "./HexagonsStack";
import { CountdownHexagonText } from "./IcoCountdown";
import * as styles from "./Incentive.scss";
import { IncentiveText } from "./IncentiveText";

interface IIncentive {
  startDate: moment.Moment;
  onFinish: () => {};
}

export const Incentive: React.SFC<IIncentive> = ({ startDate, onFinish }) =>
  <Row>
    <IncentiveText />
    <Col sm={6} xsHidden>
      <HexagonsStack className={styles.hexagons} width={480} height={480}>
        <CountdownHexagonText startDate={startDate} onFinish={onFinish} />
      </HexagonsStack>
    </Col>
    <Col className="hexagon-mobile" sm={6} smHidden mdHidden lgHidden>
      <CountdownHexagonText startDate={startDate} onFinish={onFinish} />
    </Col>
  </Row>;
