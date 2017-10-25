import * as React from "react";
import { Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { setEstimatedRewardAction } from "../actions/submitFunds";
import CurveChart, { getPrice } from "../components/CurveChart";
import PriceCalculator from "../components/PriceCalculator";
import { IAppState } from "../reducers/index";
import * as styles from "./Curve.scss";

export const Curve = (props: any) => {
  const currencyRate: number = 0.0038119801;
  const initialReward: number = 6.5;
  const capNEU: number = 1500000000;

  const min: number = 0;
  const max: number = 1000000;
  const dotsNumber: number = 50;
  const currentRasiedEther: number = 0;

  return (
    <Row>
      <h3>Rules</h3>
      <Col md={5}>
        <PriceCalculator
          estimatedReward={parseFloat(props.commitmentState.estimatedReward)}
          calculateEstimatedReward={() => {
            // tslint:disable-next-line
            if (
              typeof props.form.commitFunds.values === "undefined" ||
              typeof props.form.commitFunds.values.ethAmount === "undefined"
            ) {
              return;
            }
            if (isNaN(props.form.commitFunds.values.ethAmount)) {
              return;
            }

            const price = getPrice(
              currencyRate,
              initialReward,
              capNEU,
              props.form.commitFunds.values.ethAmount
            );
            props.setEstimatedRewardAction(price);
            return price;
          }}
          loadingEstimatedReward={props.commitmentState.loadingEstimatedReward}
        />
        <ul className={styles.information}>
          <li>NEU is denominated to EUR, EUR to ETH is stable…</li>
          <li>Neufund ICO phase:</li>
          <li>
            Start price: <b>8.25</b> NEU / 1 EUR
          </li>
          <li>
            Finish: <b>4.25</b> NEU / 1 EUR
          </li>
          <br />
          <li>Post-ICO phase:</li>
          <li>
            Start price: <b>4.25</b> NEU / 1 EUR
          </li>
          <li>Finish: ...</li>
        </ul>
      </Col>

      <Col mdOffset={2} md={5}>
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

function mapStateToProps(state: IAppState) {
  return {
    form: state.form,
    commitmentState: state.commitmentState,
  };
}

function mapDispatchToProps(dispatch: Dispatch<any>) {
  return {
    setEstimatedRewardAction: (price: number) =>
      dispatch(setEstimatedRewardAction(price.toFixed(2))),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Curve as any);
