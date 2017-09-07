import * as cn from "classnames";
import * as React from "react";
import { Button, Col, Row } from "react-bootstrap";
import * as styles from "./DuringIcoCountDown.scss";
import { BlueHexagon, IHexagonsStackProps, WhiteHexagon } from "./HexagonsStack";

interface IMoneyProps {
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

export const HexagonsStack: React.SFC<IHexagonsStackProps> = ({
  children,
  className,
  textContainerClassName,
}) =>
  <div className={cn(styles.hexContainer, className)}>
    <WhiteHexagon
      polygonPoints={"480,300 300,480 70,410 0,170 170,0 410,70"}
      width={480}
      height={480}
      className={styles.hexagonWhite}
    />
    <BlueHexagon
      polygonPoints={"480,300 300,480 70,410 0,170 170,0 410,70"}
      width={480}
      height={480}
      className={styles.hexagonBlue}
    />
    <div className={cn(styles.hexContainerText, textContainerClassName)}>
      {children}
    </div>
  </div>;

// @todo: Remove any
export const DuringIcoCountDown = (props: any) => {
  const { finishDate } = props;
  return (
    <Row className={`${styles.duringIco}`}>
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
        </div>

        <Button bsStyle="primary" className="comming-soon">
          Commit ETH
        </Button>
      </Col>
      <Col sm={6} xsHidden>
        <HexagonsStack className={styles.hexagons}>
          <HexagonText {...props} />
        </HexagonsStack>
      </Col>

      <Col className="hexagon-mobile" sm={6} smHidden mdHidden lgHidden>
        <HexagonText {...props} />
      </Col>
    </Row>
  );
};
