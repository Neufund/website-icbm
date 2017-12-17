import * as BigNumber from "bignumber.js";
import * as moment from "moment";
import { Moment } from "moment/moment";
import * as React from "react";
import { Alert, Checkbox, Col, Row } from "react-bootstrap";
import { connect, Dispatch } from "react-redux";
import { loadAftermathDetails } from "../actions/aftermathActions";
import { TokenType } from "../actions/constants";
import { LoadingIndicator } from "../components/LoadingIndicator";
import MoneyComponent from "../components/MoneyComponent";
import { TextCopyable } from "../components/TextCopyable";
import config from "../config";
import { selectLoading, selectUnlockDateEth } from "../reducers/aftermathState";
import { IAppState } from "../reducers/index";
import { etherLock, etherToken, neumark } from "../web3/contracts/ContractsRepository";

import { calculateAndFormatFee } from "../agreements/utils";
import { calculateValueAfterPenalty } from "../web3/utils";
import * as styles from "./Aftermath.scss";

interface IUnlockEtherContainerProps {
  params: { address: string };
  loadAftermathDetails: (address: string) => any;
  isLoading: boolean;
  lockedAmountEth: string;
  neumarkBalance: string;
  neumarkNeededToUnlockEth: string;
  unlockDateEth: Moment;
  penaltyFractionEth: string;
}

interface IUnlockEtherContainerState {
  agreeToPayFee: boolean;
}

class UnlockEtherContainer extends React.Component<
  IUnlockEtherContainerProps,
  IUnlockEtherContainerState
> {
  constructor(props: IUnlockEtherContainerProps) {
    super(props);
    this.state = {
      agreeToPayFee: false,
    };
  }

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
            <div className={styles.caption}>Locked ETH amount: </div>
            <div className={styles.value}>
              <MoneyComponent value={this.props.lockedAmountEth} tokenType={TokenType.ETHER} />
            </div>
          </div>

          <div className={styles.infoBox}>
            <div className={styles.caption}>ETH will be unlocked without penalty on: </div>
            <div className={styles.value}>
              {this.props.unlockDateEth.format("YYYY-MM-DD")}
            </div>
          </div>

          <div className={styles.infoBox}>
            <h4>NEU needed to unlock ether funds: </h4>
            <div className={styles.value}>
              <MoneyComponent
                value={this.props.neumarkNeededToUnlockEth}
                tokenType={TokenType.NEU}
              />
            </div>
          </div>
          {this.renderPenaltyBox()}
        </div>
        {this.renderSteps()}
      </div>
    );
  }

  private renderPenaltyBox() {
    const willBePenalized = moment().isBefore(this.props.unlockDateEth);

    if (willBePenalized) {
      return (
        <div className={styles.infoBox}>
          <div className={styles.caption}>
            Unlock fee distributed back to remaining NEU holders:{" "}
          </div>
          <div className={styles.value}>
            <MoneyComponent
              value={calculateAndFormatFee(
                this.props.penaltyFractionEth,
                this.props.lockedAmountEth
              )}
              tokenType={TokenType.ETHER}
            />
          </div>
        </div>
      );
    } else {
      return <div />;
    }
  }

  private renderSteps() {
    const neumarkNeededToUnlockAsBI = new BigNumber.BigNumber(this.props.neumarkNeededToUnlockEth);
    const neumarkBalanceAsBI = new BigNumber.BigNumber(this.props.neumarkBalance);

    const withdrawPossible = neumarkBalanceAsBI.greaterThanOrEqualTo(neumarkNeededToUnlockAsBI);
    const willBePenalized = moment().isBefore(this.props.unlockDateEth);

    const missingNEUs = neumarkNeededToUnlockAsBI.sub(neumarkBalanceAsBI);

    const penalty = calculateAndFormatFee(
      this.props.penaltyFractionEth,
      this.props.lockedAmountEth
    );

    if (!withdrawPossible) {
      return (
        <div>
          <Alert bsStyle="danger">
            Please transfer <MoneyComponent value={missingNEUs} tokenType={TokenType.NEU} /> NEU ({missingNEUs}{" "}
            Neu wei) to your wallet address as specified above. Otherwise you will not be able to
            unlock your funds
          </Alert>
        </div>
      );
    }

    return (
      <div className={styles.section}>
        {willBePenalized
          ? <Alert bsStyle="danger">
              <Checkbox onChange={this.changeAgreeToPayPenalty} checked={this.state.agreeToPayFee}>
                I confirm that by following unlock procedure I agree to return{" "}
                <MoneyComponent
                  value={this.props.neumarkNeededToUnlockEth}
                  tokenType={TokenType.NEU}
                />{" "}
                and to pay <MoneyComponent value={penalty} tokenType={TokenType.ETHER} /> unlock fee
                to remaining NEU holders
              </Checkbox>
            </Alert>
          : <Alert bsStyle="info">Withdrawing funds now will not result in penalty.</Alert>}
        {(!willBePenalized || (willBePenalized && this.state.agreeToPayFee)) &&
          <div>
            <h3>Steps to unlock your ether:</h3>
            <div>
              <strong>Step 1</strong>. Return your NEU and unlock your funds:
              <TxInfo
                contractName="Neumark"
                address={neumark.address}
                data={neumark.rawWeb3Contract.approveAndCall.getData(
                  etherLock.address,
                  this.props.neumarkNeededToUnlockEth,
                  ""
                )}
              />
            </div>
            <div>
              <strong>Step 2</strong>. Withdraw your funds from Ether Token to your wallet address:
              <TxInfo
                contractName="Ether Token"
                address={etherToken.address}
                data={etherToken.rawWeb3Contract.withdraw.getData(
                  willBePenalized
                    ? calculateValueAfterPenalty(
                        this.props.lockedAmountEth,
                        this.props.penaltyFractionEth
                      )
                    : this.props.lockedAmountEth
                )}
              />
            </div>
          </div>}
      </div>
    );
  }

  private changeAgreeToPayPenalty = () => {
    this.setState({
      agreeToPayFee: !this.state.agreeToPayFee,
    });
  };
}

function mapStateToProps(state: IAppState) {
  return {
    isLoading: selectLoading(state.aftermathState),
    lockedAmountEth: state.aftermathState.lockedAmountEth,
    neumarkBalance: state.aftermathState.neumarkBalance,
    neumarkNeededToUnlockEth: state.aftermathState.neumarkBalanceEth,
    unlockDateEth: selectUnlockDateEth(state.aftermathState),
    penaltyFractionEth: state.aftermathState.penaltyFractionEth,
  };
}

function mapDispatchToProps(dispatch: Dispatch<any>) {
  return {
    loadAftermathDetails: (address: string) => dispatch(loadAftermathDetails(address)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UnlockEtherContainer);

interface ITxInfo {
  contractName: string;
  address: string;
  data: string;
}

const TxInfo: React.SFC<ITxInfo> = ({ contractName, address, data }) =>
  <div>
    <Row>
      <Col sm={12} md={3}>
        {contractName} contract address:
      </Col>
      <Col xs={12} sm={12} md={9}>
        <TextCopyable text={address} copyIconOnRight />
      </Col>
    </Row>
    <Row>
      <Col sm={12} md={3}>
        Data:
      </Col>
      <Col xs={12} sm={12} md={9}>
        <TextCopyable text={data} copyIconOnRight maxTextLength={45} />
      </Col>
    </Row>
    <Row>
      <Col sm={12} md={3}>
        Gas limit:
      </Col>
      <Col xs={12} sm={12} md={9}>
        <TextCopyable
          text={config.contractsDeployed.unlockFundsTxGasLimit.toString()}
          copyIconOnRight
        />
      </Col>
    </Row>
  </div>;
