import * as React from "react";
import { Col } from "react-bootstrap";

import * as styles from "./IncentiveText.scss";
import MailchimpForm from "./MailchimpForm";

export const IncentiveText: React.SFC = () =>
  <Col sm={6} className={styles.incentive}>
    <h1>Community-owned Fundraising Platform</h1>

    <p>
      Neufund bridges blockchain and venture capital, enabling ICOs for on- and off-chain startups.
    </p>
    <p>
      Reserve funds
      today for your future investments. Maintain full control over your investment decisions.
    </p>
    <br/>
    <p>
      Get Neumarks
      just by reserving funds and become a co-owner of the platform.
    </p>
    <MailchimpForm />
  </Col>;
