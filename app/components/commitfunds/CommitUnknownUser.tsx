import { BigNumber } from "bignumber.js";
import { debounce } from "lodash";
import * as React from "react";
import { Col, Row } from "react-bootstrap";
import { connect } from "react-redux";

import { EtherScanLinkType } from "../../actions/constants";
import { calculateEstimatedReward } from "../../actions/submitFunds";
import config from "../../config";
import {
  selectEstimatedReward,
  selectEstimatedRewardLoadingState,
  selectMinTicketWei,
} from "../../reducers/commitmentState";
import { IAppState } from "../../reducers/index";
import { selectEthNetwork } from "../../reducers/web3State";
import { etherscanUrl } from "../../utils/etherscan";
import { publicCommitment } from "../../web3/contracts/ContractsRepository";
import * as style from "./CommitUnknownUser.scss";
import { CommitUnknownUserDesc } from "./CommitUnknownUserDesc";
import CommitUnknownUserEstimation from "./CommitUnknownUserEstimation";

interface ICommitFundsStatic {
  calculateEstimatedReward: () => {};
  contractAddress: string;
  etherScanUrl: string;
  transactionPayload: string;
  gasPrice: string;
  gasLimit: string;
  estimatedReward: BigNumber;
  loadingEstimatedReward: boolean;
  minTicketWei: BigNumber;
}

export const CommitUnknownUserComponent: React.SFC<ICommitFundsStatic> = ({
  contractAddress,
  etherScanUrl,
  transactionPayload,
  gasPrice,
  gasLimit,
  estimatedReward,
  loadingEstimatedReward,
  calculateEstimatedReward,
  minTicketWei,
}) =>
  <div>
    <Row className={style.initialLink}>
      <Col sm={12}>
        New to the blockchain? Read <a href="/manual">“How to participate”</a>.
      </Col>
    </Row>
    <Row className={style.row}>
      <Col sm={7}>
        <CommitUnknownUserDesc
          contractAddress={contractAddress}
          etherScanUrl={etherScanUrl}
          transactionPayload={transactionPayload}
          gasPrice={gasPrice}
          gasLimit={gasLimit}
          minTicketSize={minTicketWei}
        />
      </Col>
      <Col sm={5}>
        <CommitUnknownUserEstimation
          estimatedReward={estimatedReward}
          calculateEstimatedReward={calculateEstimatedReward}
          loadingEstimatedReward={loadingEstimatedReward}
          minTicketWei={minTicketWei}
        />
      </Col>
    </Row>
  </div>;

export const CommitUnknownUser = connect(
  (state: IAppState) => ({
    contractAddress: config.contractsDeployed.commitmentContractAddress,
    etherScanUrl: etherscanUrl(
      EtherScanLinkType.ADDRES,
      config.contractsDeployed.commitmentContractAddress,
      selectEthNetwork(state.web3State)
    ),
    minTicketWei: selectMinTicketWei(state.commitmentState),
    estimatedReward: selectEstimatedReward(state.commitmentState),
    loadingEstimatedReward: selectEstimatedRewardLoadingState(state.commitmentState),
    transactionPayload: publicCommitment.rawWeb3Contract.commit.getData(),
    gasPrice: config.contractsDeployed.gasPrice,
    gasLimit: config.contractsDeployed.gasLimit,
  }),
  dispatch => ({
    calculateEstimatedReward: debounce(
      () => dispatch(calculateEstimatedReward) as () => {},
      300
    ) as () => {},
  })
)(CommitUnknownUserComponent);
