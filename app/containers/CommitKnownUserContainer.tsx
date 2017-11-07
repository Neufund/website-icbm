import { BigNumber } from "bignumber.js";
import { debounce } from "lodash";
import * as React from "react";
import { Col, Grid, Row } from "react-bootstrap";
import { connect, Dispatch } from "react-redux";

import { InvestorType, Web3Type } from "../actions/constants";
import { calculateEstimatedReward, submitFunds } from "../actions/submitFunds";
import { CommitHeaderComponent } from "../components/commitfunds/CommitHeaderComponent";
import { CommitKnownUser } from "../components/commitfunds/CommitKnownUser";
import { ICommitKnownUserFormValues } from "../components/commitfunds/CommitKnownUserForm";
import { CommitNavbar } from "../components/commitfunds/CommitNavbar";
import LegalModal from "../components/LegalModal";
import WalletSelector from "../components/walletSelector/WalletSelector";
import { WhitelistedCommitmentNote } from "../components/WhitelistedCommitmentNote";
import config from "../config";
import {
  selectEstimatedReward,
  selectEstimatedRewardLoadingState,
  selectMinTicketWei,
} from "../reducers/commitmentState";
import { IAppState } from "../reducers/index";
import { selectBalance } from "../reducers/userState";
import { publicCommitment } from "../web3//contracts/ContractsRepository";
import * as layoutStyle from "./CommitLayoutStyles.scss";

interface ICommitKnownUserContainer {
  userAddress: string;
  contractAddress: string;
  transactionPayload: string;
  minTicketWei: BigNumber;
  calculateEstimatedRewardAction?: () => {};
  estimatedReward: BigNumber;
  loadingEstimatedReward: boolean;
  submitFundsAction: (values: ICommitKnownUserFormValues) => {};
  balance: BigNumber;
  web3Provider: Web3Type;
  investorType: InvestorType;
}

export const CommitKnownUserContainer: React.SFC<ICommitKnownUserContainer> = ({
  userAddress,
  contractAddress,
  transactionPayload,
  submitFundsAction,
  minTicketWei,
  calculateEstimatedRewardAction,
  loadingEstimatedReward,
  estimatedReward,
  balance,
  web3Provider,
  investorType,
}) => {
  return (
    <div>
      <LegalModal />
      <CommitNavbar>Commit funds in Neufund Commitment Opportunity</CommitNavbar>
      <Grid>
        <Row>
          <Col xs={12} className={layoutStyle.contentContainer}>
            <WhitelistedCommitmentNote />
            <CommitHeaderComponent number="01" title="Commit funds" />
            <WalletSelector />
            <CommitKnownUser
              userAddress={userAddress}
              contractAddress={contractAddress}
              transactionPayload={transactionPayload}
              calculateEstimatedReward={calculateEstimatedRewardAction}
              submitFunds={submitFundsAction}
              minTicketWei={minTicketWei}
              estimatedReward={estimatedReward}
              loadingEstimatedReward={loadingEstimatedReward}
              balance={balance}
              web3Provider={web3Provider}
              investorType={investorType}
            />
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state: IAppState) => ({
  userAddress: state.userState.address,
  contractAddress: config.contractsDeployed.commitmentContractAddress,
  transactionPayload: publicCommitment.rawWeb3Contract.commit.getData(),
  minTicketWei: selectMinTicketWei(state.commitmentState),
  estimatedReward: selectEstimatedReward(state.commitmentState),
  loadingEstimatedReward: selectEstimatedRewardLoadingState(state.commitmentState),
  balance: selectBalance(state.userState),
  web3Provider: state.web3State.web3Type,
  investorType: state.userState.investorType,
});

function mapDispatchToProps(dispatch: Dispatch<any>) {
  return {
    submitFundsAction: (values: ICommitKnownUserFormValues) =>
      dispatch(submitFunds(values.ethAmount)),
    calculateEstimatedRewardAction: debounce(
      () => dispatch(calculateEstimatedReward) as () => {},
      300
    ) as () => {},
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommitKnownUserContainer);
