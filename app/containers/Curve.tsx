import * as React from "react";
import { Col, Row } from "react-bootstrap";
import { connect } from "react-redux";

import { AppState, IcoPhase } from "../actions/constants";
import CurveChart, { getNeumarkAmount, getPrice } from "../components/CurveChart";
import { LoadingIndicator } from "../components/LoadingIndicator";
import PriceCalculator from "../components/PriceCalculator";
import config from "../config";
import { selectAllFundsInEuro } from "../reducers/duringIcoState";
import { IAppState } from "../reducers/index";
import { Q18 } from "../web3/utils";

interface ICurveStateProps {
  form: any;
  currencyRate?: number;
  raisedEuro?: number;
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
    const max: number = 1500000000;
    const dotsNumber: number = 50;

    const currencyRate = this.props.currencyRate;
    const currentRaisedEuro = this.props.raisedEuro;

    const rewardForOneEth = getPrice(currencyRate, initialReward, capNEU, currentRaisedEuro);

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
                currentRaisedEuro,
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
            currentRaisedEuro={currentRaisedEuro}
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
): { loading: boolean; currencyRate?: number; raisedEuro?: number } {
  if (!connectedToSmartcontracts) {
    return {
      loading: false,
      currencyRate: 1,
      raisedEuro: 0,
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
      currencyRate: 1,
      raisedEuro: 0,
    };
  }
  if (state.duringIcoState.loading) {
    return {
      loading: true,
    };
  }

  return {
    loading: false,
    currencyRate: 1,
    raisedEuro: selectAllFundsInEuro(state.duringIcoState).div(Q18).toNumber(),
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
