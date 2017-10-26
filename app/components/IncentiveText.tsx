import * as React from "react";
import { Col } from "react-bootstrap";

import * as styles from "./IncentiveText.scss";

export const IncentiveText: React.SFC = () =>
  <Col sm={6} className={styles.incentive}>
    <h1>Community-owned Fundraising Platform</h1>

    <p>
      Neufund bridges blockchain and venture capital, enabling ICOs for on- and off-chain startups.
    </p>
    <p>
      Reserve funds<sup>
        <a href="#how-it-works">01</a>
      </sup>{" "}
      today for your future investments. Maintain full control over your investment decisions.
    </p>
    <p>
      Get Neumarks<sup>
        <a href="#why-participate">02</a>
      </sup>{" "}
      just by reserving funds and become a co-owner of the platform.
    </p>
  </Col>;
