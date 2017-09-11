import * as moment from "moment";
import * as React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { CountdownComponent } from "./Countdown";
import * as styles from "./DuringIcoCountDown.scss";
import { HexagonsStack } from "./HexagonsStack";

interface IMoneyProps {
  raised: number;
  neuMarkAmount: number;
  neuMarkToEtherRatio: number;
  investorsAccountCreated: number;
}

interface IDuringIcoCountDownProps {
  finishDate: moment.Duration;
  raised: number;
  neuMarkAmount: number;
  neuMarkToEtherRatio: number;
  investorsAccountCreated: number;
}

export const HexagonText = (props: IMoneyProps) => {
  const { raised, neuMarkAmount, neuMarkToEtherRatio, investorsAccountCreated } = props;
  return (
    <div className={styles.text}>
      <p className={styles.title}>Total funds commited</p>
      <p className={styles.content}>
        <strong className={styles.extraSize}>{raised}</strong> ETH
      </p>

      <p className={styles.title}>Investors accounts created</p>
      <p className={styles.content}>
        <strong>
          {investorsAccountCreated}
        </strong>
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

export const DuringIcoCountDown = (props: IDuringIcoCountDownProps) => {
  const { finishDate } = props;
  return (
    <Row className={`${styles.duringIco}`}>
      <Col sm={5} className={styles.incentive}>
        <h1>Community-owned investment ecysystem</h1>
        <p>
          Neufund is an investment platform bridging the worlds of blockchain and venture capital.
        </p>
        <p>
          Commit funds now, invest them in the startups in the future. As a reward for participation
          get Neumarks. This time, ETH only. EUR soon.
        </p>
        <div className={styles.timeLeftContainer}>
          <Button bsStyle="primary" className="coming-soon">
            Commit ETH
          </Button>
          <CountdownComponent duration={finishDate} />
        </div>
      </Col>
      <Col sm={7} xsHidden>
        <HexagonsStack
          className={styles.hexagons}
          polygonPoints={"480,300 300,480 70,410 0,170 170,0 410,70"}
          isWhiteFirst={false}
          width={480}
          height={480}
          blueClassName={styles.hexagonBlue}
          whiteClassName={styles.hexagonWhite}
          hexContainerTextClassName={styles.hexContainerText}
        >
          <HexagonText {...props} />
        </HexagonsStack>
      </Col>

      <Col className="hexagon-mobile visible-xs" sm={6}>
        <HexagonText {...props} />
      </Col>
    </Row>
  );
};
