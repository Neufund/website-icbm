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
import { selectMyEtherWallerUrl } from "../../reducers/formSelectors";
import { IAppState } from "../../reducers/index";
import { selectEthNetwork } from "../../reducers/web3State";
import { etherscanUrl } from "../../utils/etherscan";
import { publicCommitment } from "../../web3/contracts/ContractsRepository";
import { LegalAgreementsDownload } from "../LegalAgreementsDownload";
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
  myEtherWalletUrl: string;
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
  myEtherWalletUrl,
}) =>
  <div>
    <Row className={style.initialLink}>
      <Col sm={12}>
        Need some help?{" "}
        <a target="_blank" href="/manual">
          Read the instructions
        </a>{" "}
        or write us on <a href="https://t.me/neufund">Telegram</a> or{" "}
        <a href="https://goo.gl/KUj1fj">Slack</a>
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
          myEtherWalletUrl={myEtherWalletUrl}
        />
      </Col>
    </Row>
    <Row>
      <Col sm={12}>
        <LegalAgreementsDownload />
      </Col>
    </Row>
  </div>;

export const CommitUnknownUser = connect(
  (state: IAppState) => ({
    contractAddress: config.contractsDeployed.commitmentContractAddress,
    etherScanUrl: etherscanUrl(
      EtherScanLinkType.ADDRESS,
      config.contractsDeployed.commitmentContractAddress,
      selectEthNetwork(state.web3State)
    ),
    minTicketWei: selectMinTicketWei(state.commitmentState),
    estimatedReward: selectEstimatedReward(state.commitmentState),
    loadingEstimatedReward: selectEstimatedRewardLoadingState(state.commitmentState),
    transactionPayload: publicCommitment.rawWeb3Contract.commit.getData(),
    gasPrice: config.contractsDeployed.gasPrice,
    gasLimit: config.contractsDeployed.gasLimit,
    myEtherWalletUrl: selectMyEtherWallerUrl(state),
  }),
  dispatch => ({
    calculateEstimatedReward: debounce(
      () => dispatch(calculateEstimatedReward) as () => {},
      300
    ) as () => {},
  })
)(CommitUnknownUserComponent);
