import * as React from "react";
import { Col, Row } from "react-bootstrap";
import { connect } from "react-redux";

import { AppState, IcoPhase } from "../actions/constants";
import CurveChart, { getNeumarkAmount, getPrice } from "../components/CurveChart";
import { LoadingIndicator } from "../components/LoadingIndicator";
import PriceCalculator from "../components/PriceCalculator";
import config from "../config";
import { selectEthEurFractionInBaseCurrency } from "../reducers/commitmentState";
import { selectAllFundsInBaseCurrency } from "../reducers/duringIcoState";
import { IAppState } from "../reducers/index";

const EUR_ETH_FIXED_RATE = 0.0038119801;

interface ICurveStateProps {
  form: any;
  currencyRate?: number;
  raisedEther?: number;
  loading: boolean;
}

interface ICurveState {
  estimatedReward: number;
}

export class Curve extends React.Component<ICurveStateProps, ICurveState> {
  constructor(props: ICurveStateProps) {
    super(props);

    this.state = {
      estimatedReward: 0,
    };
  }

  public render() {
    if (this.props.loading) {
      return <LoadingIndicator />;
    }

    const initialReward: number = 6.5;
    const capNEU: number = 1500000000;
    const min: number = 0;
    const max: number = 3000000;
    const dotsNumber: number = 50;

    const currencyRate = this.props.currencyRate;
    const currentRaisedEther = this.props.raisedEther;

    const rewardForOneEth = getPrice(currencyRate, initialReward, capNEU, currentRaisedEther);

    return (
      <Row>
        <Col md={12}>
          <h2>Get your NEU reward</h2>
        </Col>
        <Col mdOffset={1} md={4}>
          <PriceCalculator
            rewardForOneEth={rewardForOneEth}
            estimatedReward={this.state.estimatedReward}
            calculateEstimatedReward={() => {
              // tslint:disable-next-line
              if (
                typeof this.props.form.commitFunds.values === "undefined" ||
                typeof this.props.form.commitFunds.values.ethAmount === "undefined"
              ) {
                this.setEstimatedRewardAction(0);
                return;
              }

              let ethAmount = this.props.form.commitFunds.values.ethAmount;
              ethAmount = ethAmount.replace(",", ".");

              if (
                isNaN(ethAmount) ||
                parseFloat(ethAmount) <= 0 ||
                this.props.form.commitFunds.values.ethAmount.length > 9
              ) {
                this.setEstimatedRewardAction(0);
                return;
              }

              const price = getNeumarkAmount(
                currencyRate,
                initialReward,
                capNEU,
                currentRaisedEther,
                parseFloat(ethAmount)
              );
              this.setEstimatedRewardAction(price);
              return price;
            }}
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
            currentRasiedEther={currentRaisedEther}
          />
        </Col>
      </Row>
    );
  }

  private setEstimatedRewardAction(value: number) {
    this.setState({
      estimatedReward: value,
    });
  }
}

function mapStateAndConfigToProps(
  state: IAppState,
  connectedToSmartcontracts: boolean
): { loading: boolean; currencyRate?: number; raisedEther?: number } {
  if (!connectedToSmartcontracts) {
    return {
      loading: false,
      currencyRate: EUR_ETH_FIXED_RATE,
      raisedEther: 0,
    };
  }
  if (state.commitmentState.loading) {
    return {
      loading: true,
    };
  }
  if (state.commitmentState.commitmentState === IcoPhase.BEFORE) {
    return {
      loading: false,
      currencyRate: 1 / selectEthEurFractionInBaseCurrency(state.commitmentState).toNumber(),
      raisedEther: 0,
    };
  }
  if (state.duringIcoState.loading) {
    return {
      loading: true,
    };
  }
  return {
    loading: false,
    currencyRate: 1 / selectEthEurFractionInBaseCurrency(state.commitmentState).toNumber(),
    raisedEther: selectAllFundsInBaseCurrency(
      state.duringIcoState,
      state.commitmentState.ethDecimals
    ).toNumber(),
  };
}

function mapStateToProps(state: IAppState) {
  const connectedToBlockchain = config.appState === AppState.CONTRACTS_DEPLOYED;

  return {
    ...mapStateAndConfigToProps(state, connectedToBlockchain),
    form: state.form,
  };
}

export default connect<ICurveStateProps, {}, {}>(mapStateToProps)(Curve);
