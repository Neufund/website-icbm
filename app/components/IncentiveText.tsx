import * as React from "react";
import { Col } from "react-bootstrap";

import * as styles from "./IncentiveText.scss";
import { MailchimpForm } from "./MailchimpForm";

export const IncentiveText: React.SFC = () =>
  <Col sm={6} className={styles.incentive}>
    <h1>Community-owned Fundraising Platform</h1>

    <p>
      Neufund bridges blockchain and venture capital, enabling ICOs for on- and off-chain companies.
    </p>
    <p>
      Reserve funds today for your future investments and receive Neumarks, making you a co-owner of
      the platform.
    </p>
    <p>You maintain full control over your investment decisions, at all times.</p>
    <MailchimpForm />
  </Col>;
