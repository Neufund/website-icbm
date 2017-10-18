import * as BigNumber from "bignumber.js";
import * as moment from "moment";
import * as React from "react";
import { Col, Row } from "react-bootstrap";

import { Countdown } from "./Countdown";
import { HexagonsStack } from "./HexagonsStack";
import * as styles from "./Incentive.scss";

interface IBeforeIcoComponentProps {
  startDate: moment.Moment;
  onFinish: () => {};
  neumarkInitialRate?: BigNumber.BigNumber;
}
interface IIncentive {
  startDate: moment.Moment;
  onFinish: () => {};
  neumarkInitialRate?: BigNumber.BigNumber;
}

export const HexagonText: React.SFC<IBeforeIcoComponentProps> = ({
  startDate,
  onFinish,
  neumarkInitialRate,
}) =>
  <div className={styles.countdown}>
    <div>
      <h3>Commitment Opportunity starts on:</h3>
      <h1>
        {startDate.format("DD.MM.YYYY")}
      </h1>
      <Countdown finishDate={startDate} onFinish={onFinish} />
      <h3>Reward starting point:</h3>
      <p>
        {" "} {neumarkInitialRate ? neumarkInitialRate.toFixed(2) : "--"} NEU / <strong>1</strong>{" "}
        ETH
      </p>
    </div>
  </div>;

export const Incentive: React.SFC<IIncentive> = ({ startDate, onFinish, neumarkInitialRate }) =>
  <Row>
    <Col sm={6} className={styles.incentive}>
      <h1>Community-owned Fundraising Platform</h1>

      <p>
        Neufund bridges blockchain and venture capital, enabling ICOs for on- and off-chain
        startups.
      </p>
      <p>
        Reserve funds<sup>
          <a href="#how-it-works">01</a>
        </sup>{" "}
        today for your future investments. Maintain full control over your investment decisions.
      </p>
      <p>
        Get Neumarks<sup>
          <a href="#why-participate">02</a>
        </sup>{" "}
        simply by reserving funds, and become a co-owner of the ecosystem.
      </p>
    </Col>
    <Col sm={6} xsHidden>
      <HexagonsStack className={styles.hexagons}>
        <HexagonText
          startDate={startDate}
          onFinish={onFinish}
          neumarkInitialRate={neumarkInitialRate}
        />
      </HexagonsStack>
    </Col>
    <Col className="hexagon-mobile" sm={6} smHidden mdHidden lgHidden>
      <HexagonText
        startDate={startDate}
        onFinish={onFinish}
        neumarkInitialRate={neumarkInitialRate}
      />
    </Col>
  </Row>;
