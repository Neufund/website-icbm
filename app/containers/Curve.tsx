import * as React from "react";
import { Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { setEstimatedRewardAction } from "../actions/submitFunds";
import CurveChart, { getNeumarkAmount } from "../components/CurveChart";
import PriceCalculator from "../components/PriceCalculator";
import { IAppState } from "../reducers/index";

export const Curve = (props: any) => {
  const currencyRate: number = 0.0038119801;
  const initialReward: number = 6.5;
  const capNEU: number = 1500000000;

  const min: number = 0;
  const max: number = 3000000;
  const dotsNumber: number = 50;
  const currentRasiedEther: number = 0;
  const rewardForOneEth = getNeumarkAmount(
    currencyRate,
    initialReward,
    capNEU,
    currentRasiedEther,
    1
  );

  return (
    <Row>
      <Col md={12}>
        <h2>Get your NEU reward</h2>
      </Col>
      <Col mdOffset={1} md={4}>
        <PriceCalculator
          rewardForOneEth={rewardForOneEth}
          estimatedReward={parseFloat(props.commitmentState.estimatedReward)}
          calculateEstimatedReward={() => {
            // tslint:disable-next-line
            if (
              typeof props.form.commitFunds.values === "undefined" ||
              typeof props.form.commitFunds.values.ethAmount === "undefined"
            ) {
              props.setEstimatedRewardAction(0);
              return;
            }

            let ethAmount = props.form.commitFunds.values.ethAmount;
            ethAmount = ethAmount.replace(",", ".");

            if (
              isNaN(ethAmount) ||
              parseFloat(ethAmount) <= 0 ||
              props.form.commitFunds.values.ethAmount.length > 9
            ) {
              props.setEstimatedRewardAction(0);
              return;
            }

            const price = getNeumarkAmount(
              currencyRate,
              initialReward,
              capNEU,
              currentRasiedEther,
              parseFloat(ethAmount)
            );
            props.setEstimatedRewardAction(price);
            return price;
          }}
          loadingEstimatedReward={props.commitmentState.loadingEstimatedReward}
        />
      </Col>

      <Col mdOffset={1} md={6}>
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
