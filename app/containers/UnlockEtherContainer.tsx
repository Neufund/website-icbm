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

import * as styles from "./Aftermath.scss";

const GAS_LIMIT = 600000;

interface IUnlockEtherContainerProps {
  params: { address: string };
  loadAftermathDetails: (address: string) => any;
  isLoading: boolean;
  lockedAmountEth: string;
  neumarkBalance: string;
  neumarkNeededToUnlockEth: string;
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

    return (
      <div>
        <h1>Unlock your funds</h1>
        <p>You can unlock your funds anytime you want.</p>
        <p>
          You need to give back all neumarks rewarded to you. If you unlock before unlock period is
          over you will be penalized with 10% value of your funds.
        </p>
        <div className={styles.section}>
          <div className={styles.infoBox}>
            <div className={styles.caption}>Your wallet address:</div>
            <div className={styles.value}>
              {this.props.params.address}
            </div>
          </div>

          <div className={styles.infoBox}>
            <div className={styles.caption}>Your NEU balance: </div>
            <div className={styles.value}>
              <MoneyComponent value={this.props.neumarkBalance} tokenType={TokenType.NEU} />
            </div>
          </div>

          <div className={styles.infoBox}>
            <div className={styles.caption}>Ether locked: </div>
            <div className={styles.value}>
              <MoneyComponent value={this.props.lockedAmountEth} tokenType={TokenType.ETHER} />
            </div>
          </div>

          <div className={styles.infoBox}>
            <div className={styles.caption}>NEU needed to unlock ether funds: </div>
            <div className={styles.value}>
              <MoneyComponent
                value={this.props.neumarkNeededToUnlockEth}
                tokenType={TokenType.NEU}
              />
            </div>
          </div>

          <div className={styles.infoBox}>
            <div className={styles.caption}>Free unlock date: </div>
            <div className={styles.value}>
              {this.props.unlockDateEth.format("YYYY-MM-DD")}
            </div>
          </div>
        </div>
        {this.renderSteps()}
      </div>
    );
  }

  private renderSteps() {
    const neumarkNeededToUnlockAsBI = new BigNumber.BigNumber(this.props.neumarkNeededToUnlockEth);
    const neumarkBalanceAsBI = new BigNumber.BigNumber(this.props.neumarkBalance);

    const withdrawPossible = neumarkBalanceAsBI.greaterThanOrEqualTo(neumarkNeededToUnlockAsBI);
    const willBePenalized = moment().isBefore(this.props.unlockDateEth);

    if (!withdrawPossible) {
      return (
        <div>
          <Alert bsStyle="danger">
            You need{" "}
            <MoneyComponent
              value={neumarkNeededToUnlockAsBI.sub(neumarkBalanceAsBI)}
              tokenType={TokenType.NEU}
            />{" "}
            Neumarks more to unlock your account.
          </Alert>
        </div>
      );
    }

    return (
      <div className={styles.section}>
        {willBePenalized
          ? <Alert bsStyle="danger">
              Withdrawing funds now will result in penalty of 10% of your funds!
            </Alert>
          : <Alert bsStyle="info">Withdrawing funds now will not result in penalty.</Alert>}
        <h3>Steps to unlock your ether:</h3>
        <ol>
          <li>
            Send transaction to unlock your locked funds:
            <TxInfo
              address={neumark.address}
              data={neumark.rawWeb3Contract.approveAndCall.getData(
                etherLock.address,
                this.props.neumarkNeededToUnlockEth,
                ""
              )}
            />
          </li>
          <li>
            Withdraw your funds
            <TxInfo
              address={etherToken.address}
              data={etherToken.rawWeb3Contract.withdraw.getData(
                calculateValueAfterPenalty(this.props.lockedAmountEth, willBePenalized)
              )}
            />
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
    neumarkBalance: state.aftermathState.neumarkBalance,
    neumarkNeededToUnlockEth: state.aftermathState.neumarkBalanceEth,
    unlockDateEth: selectUnlockDateEth(state.aftermathState),
  };
}

function mapDispatchToProps(dispatch: Dispatch<any>) {
  return {
    loadAftermathDetails: (address: string) => dispatch(loadAftermathDetails(address)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UnlockEtherContainer);

interface ITxInfo {
  address: string;
  data: string;
}

const TxInfo: React.SFC<ITxInfo> = ({ address, data }) =>
  <div>
    <Row>
      <Col sm={2}>Address:</Col>
      <Col xs={12} sm={10}>
        <TextCopyable text={address} copyIconOnRight />
      </Col>
    </Row>
    <Row>
      <Col sm={2}>Data:</Col>
      <Col xs={12} sm={10}>
        <TextCopyable text={data} copyIconOnRight maxTextLength={45} />
      </Col>
    </Row>
    <Row>
      <Col sm={2}>Gas limit:</Col>
      <Col xs={12} sm={10}>
        <TextCopyable text={GAS_LIMIT.toString()} copyIconOnRight />
      </Col>
    </Row>
  </div>;
