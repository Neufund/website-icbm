import * as BigNumber from "bignumber.js";
import * as React from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router";

import { HexagonText } from "./DuringIcoCountdown";
import * as styles from "./DuringIcoCountdown.scss";
import { HexagonsStack, HexagonsStackStyle } from "./HexagonsStack";
import { MailchimpForm } from "./MailchimpForm";

interface IAfterIcoSumupProps {
  loading: boolean;
  raised?: BigNumber.BigNumber;
  neuMarkAmount?: BigNumber.BigNumber;
  neuMarkToEtherRatio?: BigNumber.BigNumber;
  investorsAccountCreated: BigNumber.BigNumber;
}

export const AfterIcoSumup = (props: IAfterIcoSumupProps) => {
  return (
    <Row className={`${styles.duringIco}`} data-test-id="during-ico-phase">
      <Col sm={5} className={styles.incentive}>
        <h1>Our ICBM ended on 17 December 2017, 11:00 am UTC</h1>
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
