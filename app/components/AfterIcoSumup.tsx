import * as BigNumber from "bignumber.js";
import * as React from "react";
import { Col, Row } from "react-bootstrap";

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
        <h1>ICBM has finished!</h1>
        <p>Thank you for all of your support!</p>
        <p>
          Neufund is an investment platform bridging the worlds of blockchain and venture capital.
        </p>

        <MailchimpForm />
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
