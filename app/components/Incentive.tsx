import * as React from "react";
import { Grid, Row, Col, Button } from "react-bootstrap";

import { Hexagon } from "./Hexagon";

import * as styles from "./Incentive.scss";

export const Incentive: React.SFC = () =>
  <Grid>
    <Row>
      <Col sm={6} className={styles.incentive}>
        <h1>Community owned investment ecosystem</h1>

        <p>
          Commit funds to invest in the future. As a reward for early participation you will get a
          token (neumark) representing the platform’s ownership.
        </p>
        <p>For more information on the commitment process and its legal aspects read the FAQ</p>

        <Button bsStyle="primary">How to participate</Button>
      </Col>
      <Col sm={6}>
        <div className={styles.hexContainer}>
          <BlueHexagon />
          <WhiteHexagon />
          <div className={styles.hexContainerText}>
            <p>Commitment Opportunity starts in:</p>
            <h1>
              Future
            </h1>
          </div>
        </div>
      </Col>
    </Row>
  </Grid>;

const blueGradient = (<defs>
      <linearGradient
        id="linear-gradient"
        gradientUnits="userSpaceOnUse"
        x1="0"
        y1="0"
        x2="0"
        y2="300"
      >
        <stop offset="14%" stopColor="#09719B" stopOpacity="0%" />
        <stop offset="43%" stopColor="#09719B" stopOpacity="0%" />
        <stop offset="100%" stopColor="#424A52" stopOpacity="0%" />
      </linearGradient>
    </defs>
)
const BlueHexagon: React.SFC = () => <Hexagon className={styles.hexagonBlue} extraDefs={blueGradient} style={{fill:'url(#linear-gradient)', filter:'url(#dropshadow)'}} />

const whiteGradient = (<defs>
      <linearGradient
        id="linear-gradient2"
        gradientUnits="userSpaceOnUse"
        x1="0"
        y1="0"
        x2="0"
        y2="300"
      >
        <stop offset="0%" stopColor="#F8F9F9" stopOpacity="0%" />
        <stop offset="1.63%" stopColor="#F8F9F9" stopOpacity="0%" />
        <stop offset="85.72%" stopColor="#F2F9EA" stopOpacity="0%" />
        <stop offset="100%" stopColor="#F2F9EA" stopOpacity="0%" />
      </linearGradient>
    </defs>
)
const WhiteHexagon: React.SFC = () => <Hexagon className={styles.hexagonWhite} extraDefs={whiteGradient} style={{fill:'url(#linear-gradient2)', filter:'url(#dropshadow)'}} />