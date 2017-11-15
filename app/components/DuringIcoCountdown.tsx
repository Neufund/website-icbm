import * as BigNumber from "bignumber.js";
import * as moment from "moment";
import * as React from "react";
import { Col, Row } from "react-bootstrap";

import { Countdown } from "./Countdown";
import * as styles from "./DuringIcoCountdown.scss";
import { HexagonsStack, HexagonsStackStyle } from "./HexagonsStack";
import { LoadingIndicator } from "./LoadingIndicator";
import { MailchimpForm } from "./MailchimpForm";

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
  const { loading } = props;
  if (loading) {
    return <LoadingIndicator className={styles.loadingIndicator} />;
  }

  return (
    <div className={styles.text}>
      <p className={styles.content} data-test-id="during-ico-total-funds">
        <span className={styles.importantValue}>
          Pre-ICBM <br />in progress
        </span>
      </p>
    </div>
  );
};


export const DuringIcoCountdown = (props: IDuringIcoCountdownProps) => {
  const { finishDate } = props;
  return (
    <Row className={`${styles.duringIco}`} data-test-id="during-ico-phase">
      <Col sm={5} className={styles.incentive}>
        <h1>Community-owned Fundraising Platform</h1>

        <p>
          Neufund bridges blockchain and venture capital, enabling ICOs for on- and off-chain
          companies.
        </p>
        <p>
          Reserve funds today for your future investments and receive Neumarks making you a co-owner
          of the platform.
        </p>
        <p>You maintain full control over your investment decisions at all times.</p>
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

        <ul className="links-list">
          <li>
            <i className="material-icons">link</i>
            <a href="https://medium.com/@agnieszkasa/a9a450cf0022" target="_blank">
              ICBM terms and instructions
            </a>
          </li>
        </ul>

        <MailchimpForm hideForm={true}/>

        <div className={styles.buttonContainer}>
          <a href="/commit" className="btn btn-primary" data-test-id="during-ico-commit-btn">
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
