import * as React from "react";
import * as moment from "moment";
import { Button, Col, Grid, Row } from "react-bootstrap";
import { HexagonsStack } from "./HexagonStackDuringIco";
import * as styles from "./DuringIco.scss";
import * as incentiveStyles from "./Incentive.scss";

interface IMoneyProps {
  raised: number;
  neuMarkAmount: number;
  neuMarkToEtherRatio: number;
}

interface IDuringIcoComponentProps {
  money: IMoneyProps;
  finishDate: moment.Moment;
}

export const HexagonText = (props: IMoneyProps) => {
  const { raised, neuMarkAmount, neuMarkToEtherRatio } = props;
  return (
    <div className={styles.text}>
      <p className={styles.title}>Total funds commited</p>
      <p className={styles.content}>
        <strong className={styles.extraSize}>{raised}</strong> ETH
      </p>

      <p className={styles.title}>Neumarks generated</p>
      <p className={styles.content}>
        <strong>{neuMarkAmount}</strong> <span>NEU</span>
      </p>

      <p className={styles.title}>Reward</p>
      <p className={styles.content}>
        <strong>{neuMarkToEtherRatio}</strong> <span> NEU / </span> <strong>1</strong>{" "}
        <span>ETH</span>
      </p>
    </div>
  );
};

// @todo: Remove any
export const DuringIco = (props: any) => {
  const { raised, neuMarkAmount, neuMarkToEtherRatio, finishDate } = props;
  return (
    <Row className={`${styles.duringIco} ${incentiveStyles.incentive}`}>
      <Col sm={6} className={styles.incentive}>
        <h1>Community-owned investment ecysystem</h1>
        <p>
          Neufund is an investment platform bridging the worlds of blockchain and venture capital.
        </p>
        <p>
          Commit funds now, invest them in the startups in the future. As a reward for participation
          get Neumarks. This time, ETH only. EUR soon.
        </p>
        <div className={styles.timeLeftContainer}>
          <p>
            <span className={styles.timeLeft}>Time left to the end: </span>

            <span className={styles.label}>d</span>
            <span className={styles.value}>
              {finishDate.days()}
            </span>

            <span className={styles.label}>h</span>
            <span className={styles.value}>
              {finishDate.hours()}
            </span>

            <span className={styles.label}>m</span>
            <span className={styles.value}>
              {finishDate.minutes()}
            </span>

            <span className={styles.label}>s</span>
            <span className={styles.value}>
              {finishDate.seconds()}
            </span>
          </p>
        </div>

        <Button bsStyle="primary" className="comming-soon">
          Commit ETH
        </Button>
      </Col>
      <Col sm={6} xsHidden>
        <HexagonsStack className={incentiveStyles.hexagons}>
          <HexagonText {...props} />
        </HexagonsStack>
      </Col>

      <Col className="hexagon-mobile" sm={6} smHidden mdHidden lgHidden>
        <HexagonText {...props} />
      </Col>
    </Row>
  );
};
