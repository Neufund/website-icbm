import * as BigNumber from "bignumber.js";
import { Moment } from "moment";
import * as React from "react";
import { Col, Row } from "react-bootstrap";

import { HexagonText } from "./DuringIcoCountdown";
import * as styles from "./DuringIcoCountdown.scss";
import { HexagonsStack, HexagonsStackStyle } from "./HexagonsStack";

interface IAfterIcoSumupProps {
  loading: boolean;
  raised?: BigNumber.BigNumber;
  neuMarkAmount?: BigNumber.BigNumber;
  neuMarkToEtherRatio?: BigNumber.BigNumber;
  investorsAccountCreated: BigNumber.BigNumber;
  endDate: Moment;
}

export const AfterIcoSumup = (props: IAfterIcoSumupProps) => {
  const endDateFormatted = props.endDate.format("D MMMM YYYY, hh:mm a UTC");

  return (
    <Row className={`${styles.duringIco}`} data-test-id="during-ico-phase">
      <Col sm={5} className={styles.incentive}>
        <h1>
          Our ICBM ended on {endDateFormatted}
        </h1>
        <p>Thank you for all of your support!</p>
        <p>
          Neufund bridges blockchain and venture capital, enabling ICOs for on- and off-chain
          companies.
        </p>
        <p>
          You reserved your funds for future investments on the Neufund Platform.<br />
          Your NEU entitle you to economic co-ownership of the platform.
        </p>
        <p>You maintain full control over your investment decisions at all times.</p>

        <ul className="links-list">
          <li>
            <i className="material-icons">link</i>
            <a
              href="https://icomonitor.io/#/0xf432cec23b2a0d6062b969467f65669de81f4653"
              target="_blank"
            >
              ICBM details in the ICO Transparency Monitor
            </a>
          </li>
        </ul>

        <a href="/commit/status" className="btn btn-primary btn-link">
          See your commitment status
        </a>
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
