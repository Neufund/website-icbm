import * as React from "react";
import { Col, Row } from "react-bootstrap";
import CurveChart from "../components/CurveChart";

export default () => {
  const currencyRate: number = 0.0038119801;
  const initialReward: number = 6.5;
  const capNEU: number = 1500000000;

  const min: number = 0;
  const max: number = 1000000;
  const dotsNumber: number = 50;
  const currentRasiedEther: number = 480000;

  return (
    <Row>
      <Col md={6} />
      <Col md={5}>
        <CurveChart
          currencyRate={currencyRate}
          initialReward={initialReward}
          capNEU={capNEU}
          min={min}
          max={max}
          dotsNumber={dotsNumber}
          currentRasiedEther={currentRasiedEther}
        />
      </Col>
    </Row>
  );
};
