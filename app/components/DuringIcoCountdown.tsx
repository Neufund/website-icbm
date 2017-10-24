import * as BigNumber from "bignumber.js";
import * as moment from "moment";
import * as React from "react";
import { Col, Row } from "react-bootstrap";

import { Countdown } from "./Countdown";
import * as styles from "./DuringIcoCountdown.scss";
import { HexagonsStack, HexagonsStackStyle } from "./HexagonsStack";
import { LoadingIndicator } from "./LoadingIndicator";

interface IMoneyProps {
  loading: boolean;
  raised?: BigNumber.BigNumber;
  neuMarkAmount?: BigNumber.BigNumber;
  neuMarkToEtherRatio?: BigNumber.BigNumber;
  investorsAccountCreated: BigNumber.BigNumber;
}

interface IDuringIcoCountdownProps {
  loading: boolean;
  finishDate: moment.Moment;
  raised?: BigNumber.BigNumber;
  neuMarkAmount?: BigNumber.BigNumber;
  neuMarkToEtherRatio?: BigNumber.BigNumber;
  investorsAccountCreated: BigNumber.BigNumber;
}

export const HexagonText = (props: IMoneyProps) => {
  const { loading, raised, neuMarkAmount, neuMarkToEtherRatio, investorsAccountCreated } = props;
  if (loading) {
    return <LoadingIndicator className={styles.loadingIndicator} />;
  }

  return (
    <div className={styles.text}>
      <p className={styles.title}>Total funds committed</p>
      <p className={styles.content}>
        <strong className={styles.extraSize}>{raised.toFixed(2)}</strong> ETH
      </p>

      <p className={styles.title}>Investors accounts created</p>
      <p className={styles.content}>
        <strong>
          {investorsAccountCreated.toFixed(0)}
        </strong>
      </p>

      <p className={styles.title}>Neumarks generated</p>
      <p className={styles.content}>
        <strong>{neuMarkAmount.toFixed(2)}</strong> <span>NEU</span>
      </p>

      <p className={styles.title}>Reward</p>
      <p className={styles.content}>
        <strong>{neuMarkToEtherRatio.toFixed(2)}</strong> <span> NEU / </span> <strong>1</strong>{" "}
        <span>ETH</span>
      </p>
    </div>
  );
};

export const DuringIcoCountdown = (props: IDuringIcoCountdownProps) => {
  const { finishDate } = props;
  return (
    <Row className={`${styles.duringIco}`}>
      <Col sm={5} className={styles.incentive}>
        <h1>Community-owned investment ecosystem</h1>
        <p>
          Neufund is an investment platform bridging the worlds of blockchain and venture capital.
        </p>
        <p>
          Commit funds now, invest them in the startups in the future. As a reward for participation
          get Neumarks. This time, ETH only. EUR soon.
        </p>
        <p>
          Time left to the end:{" "}
          <Countdown
            finishDate={finishDate}
            classNames={{
              root: styles.countdownRoot,
              label: styles.countdownLabel,
              value: styles.countdownValue,
            }}
          />
        </p>

        <div className={styles.buttonContainer}>
          <a href="/commit" className="btn btn-primary">
            Commit ETH
          </a>
        </div>
      </Col>
      <Col sm={7} xsHidden>
        <HexagonsStack
          className={styles.hexagons}
          visualStyle={HexagonsStackStyle.BLUE_WHITE}
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
