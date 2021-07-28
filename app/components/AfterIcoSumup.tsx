import * as BigNumber from "bignumber.js";
import { Moment } from "moment";
import * as React from "react";
import { Col, Row } from "react-bootstrap";

import { AfterIcoHexagonText } from "./DuringIcoCountdown";
import * as styles from "./DuringIcoCountdown.scss";
import { HexagonsStack, HexagonsStackStyle } from "./HexagonsStack";
import { MailchimpForm } from "./MailchimpForm";

interface IAfterIcoSumupProps {
  loading: boolean;
  raised?: BigNumber.BigNumber;
  neuMarkAmount?: BigNumber.BigNumber;
  neuMarkToEtherRatio?: BigNumber.BigNumber;
  investorsAccountCreated: BigNumber.BigNumber;
  endDate: Moment;
}

export const AfterIcoSumup = (props: IAfterIcoSumupProps) => {
  const endDateFormatted = props.endDate.utc().format("D MMMM YYYY, hh:mm a UTC");

  return (
    <Row className={`${styles.duringIco}`} data-test-id="during-ico-phase">
      <Col sm={5} className={styles.incentive}>
        <h1>Unlock your commitment below</h1>

        <p>
          Thank you for joining ICBM! You can unlock your funds by following the instructions under
          'See your commitment status'
        </p>

        <p></p>

        <MailchimpForm hideForm />

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
          <AfterIcoHexagonText {...props} />
        </HexagonsStack>
      </Col>

      <Col className="hexagon-mobile visible-xs" sm={6}>
        <AfterIcoHexagonText {...props} />
      </Col>
    </Row>
  );
};
