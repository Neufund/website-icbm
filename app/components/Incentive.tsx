import * as moment from "moment";
import * as React from "react";
import { Button, Col, Grid, Row } from "react-bootstrap";
import { web3Instance } from "../web3/web3Provider";

import { commitmentStartDate } from "../config";
import { Countdown } from "./Countdown";
import { HexagonsStack } from "./HexagonsStack";

import { loadIcoStats } from "../web3/loadIcoStats";
import * as styles from "./Incentive.scss";
interface IBeforeIcoComponentProps {
  startDate: moment.Moment;
}

export const HexagonText: React.SFC<IBeforeIcoComponentProps> = ({ startDate }) =>
  // <div className={styles.text}>
  //   <p className={styles.goto}>Starts in:</p>
  //   <h1 className={styles.time}>
  //     Autumn<br />2017
  <Countdown finishDate={startDate} />;
// </h1>
// </div>;

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
        <HexagonText startDate={commitmentStartDate} />
      </HexagonsStack>
    </Col>
    <Col className="hexagon-mobile" sm={6} smHidden mdHidden lgHidden>
      <HexagonText startDate={commitmentStartDate} />
    </Col>
  </Row>;
