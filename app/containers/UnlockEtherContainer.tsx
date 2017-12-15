import * as BigNumber from "bignumber.js";
import * as moment from "moment";
import { Moment } from "moment/moment";
import * as React from "react";
import { Alert, Col, Row } from "react-bootstrap";
import { connect, Dispatch } from "react-redux";
import { loadAftermathDetails } from "../actions/aftermathActions";
import { TokenType } from "../actions/constants";
import { LoadingIndicator } from "../components/LoadingIndicator";
import MoneyComponent from "../components/MoneyComponent";
import { TextCopyable } from "../components/TextCopyable";
import { selectLoading, selectUnlockDateEth } from "../reducers/aftermathState";
import { IAppState } from "../reducers/index";
import { etherLock, etherToken, neumark } from "../web3/contracts/ContractsRepository";

interface IUnlockEtherContainerProps {
  params: { address: string };
  loadAftermathDetails: (address: string) => any;
  isLoading: boolean;
  lockedAmountEth: string;
  neumarkBalanceEth: string;
  unlockDateEth: Moment;
}

class UnlockEtherContainer extends React.Component<IUnlockEtherContainerProps> {
  public componentDidMount() {
    this.props.loadAftermathDetails(this.props.params.address);
  }

  public render() {
    if (this.props.isLoading) {
      return <LoadingIndicator />;
    }

    const willBePenalized = moment().isBefore(this.props.unlockDateEth);

    return (
      <div>
        <h1>Unlock your funds</h1>
        <p>You can unlock your funds anytime you want.</p>
        <p>
          You need to give back all neumarks rewarded to you. If you unlock before unlock period is
          over you will be penalized with 10% value of your funds.
        </p>
        <p>
          <div>
            Address: <strong>{this.props.params.address}</strong>
          </div>
          <div>
            Ether locked:{" "}
            <MoneyComponent tokenType={TokenType.ETHER} value={this.props.lockedAmountEth} />
          </div>
          <div>
            Free unlock date: <strong>{this.props.unlockDateEth.toString()}</strong>
          </div>
        </p>
        {willBePenalized &&
          <Alert bsStyle="danger">
            Withdrawing funds now will result in penalty of 10% of your funds!
          </Alert>}
        <h3>Steps to unlock your ether:</h3>
        <ol>
          <li>
            Send transaction to unlock your locked funds:
            <Row>
              <Col sm={2}>Address:</Col>
              <Col xs={12} sm={10}>
                <TextCopyable text={neumark.address} copyIconOnRight />
              </Col>
            </Row>
            <Row>
              <Col sm={2}>Data:</Col>
              <Col xs={12} sm={10}>
                <TextCopyable
                  text={neumark.rawWeb3Contract.approveAndCall.getData(
                    etherLock.address,
                    this.props.neumarkBalanceEth,
                    ""
                  )}
                  copyIconOnRight
                  maxTextLength={45}
                />
              </Col>
            </Row>
          </li>
          <li>
            Withdraw your funds
            <Row>
              <Col sm={2}>Address:</Col>
              <Col xs={12} sm={10}>
                <TextCopyable text={etherToken.address} copyIconOnRight />
              </Col>
            </Row>
            <Row>
              <Col sm={2}>Data:</Col>
              <Col xs={12} sm={10}>
                <TextCopyable
                  text={etherToken.rawWeb3Contract.withdraw.getData(
                    calculateValueAfterPenalty(this.props.lockedAmountEth, willBePenalized)
                  )}
                  copyIconOnRight
                  maxTextLength={45}
                />
              </Col>
            </Row>
          </li>
        </ol>
      </div>
    );
  }
}

function calculateValueAfterPenalty(eth: string, penalty: boolean): string {
  if (!penalty) {
    return eth;
  }
  const ethValue = new BigNumber.BigNumber(eth);
  const penaltyValue = ethValue.mul(new BigNumber.BigNumber("0.10"));
  return ethValue.sub(penaltyValue).toString(); // this can be un accurate
}

function mapStateToProps(state: IAppState) {
  return {
    isLoading: selectLoading(state.aftermathState),
    lockedAmountEth: state.aftermathState.lockedAmountEth,
    neumarkBalanceEth: state.aftermathState.neumarkBalanceEth,
    unlockDateEth: selectUnlockDateEth(state.aftermathState),
  };
}

function mapDispatchToProps(dispatch: Dispatch<any>) {
  return {
    loadAftermathDetails: (address: string) => dispatch(loadAftermathDetails(address)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UnlockEtherContainer);
