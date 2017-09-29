import { BigNumber } from "bignumber.js";
import { debounce } from "lodash";
import * as React from "react";
import { Col, Grid, Row } from "react-bootstrap";
import { connect, Dispatch } from "react-redux";
import { calculateEstimatedReward, submitFunds } from "../actions/submitFunds";
import { CommitHeaderComponent } from "../components/commitfunds/CommitHeaderComponent";
import { CommitKnownUser } from "../components/commitfunds/CommitKnownUser";
import CommitKnownUserAftermath from "../components/commitfunds/CommitKnownUserAftermath";
import { ICommitKnownUserFormValues } from "../components/commitfunds/CommitKnownUserForm";
import { CommitNavbar } from "../components/commitfunds/CommitNavbar";
import { TransactionConfirmationModal } from "../components/commitfunds/TransactionConfirmationModal";
import LegalModal from "../components/LegalModal";
import config from "../config";
import {
  selectEstimatedReward,
  selectEstimatedRewardLoadingState,
  selectMinTicketWei,
} from "../reducers/commitmentState";
import { IAppState } from "../reducers/index";
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
  txStarted: boolean;
  txHash: string;
  blockOfConfirmation: number;
  currentBlock: number;
  error: string;
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
  txStarted,
  txHash,
  blockOfConfirmation,
  currentBlock,
  error,
}) => {
  return (
    <div>
      <LegalModal />
      <TransactionConfirmationModal
        txStarted={txStarted}
        txHash={txHash}
        blockOfConfirmation={blockOfConfirmation}
        currentBlock={currentBlock}
        error={error}
      />
      <CommitNavbar>Commit funds in Neufund Commitment Opportunity</CommitNavbar>
      <Grid>
        <Row>
          <Col xs={12} className={layoutStyle.contentContainer}>
            <CommitHeaderComponent number="01" title="Commit funds" />
            <CommitKnownUser
              userAddress={userAddress}
              contractAddress={contractAddress}
              transactionPayload={transactionPayload}
              calculateEstimatedReward={calculateEstimatedRewardAction}
              submitFunds={submitFundsAction}
              minTicketWei={minTicketWei}
              estimatedReward={estimatedReward}
              loadingEstimatedReward={loadingEstimatedReward}
            />
            <Row>
              <Col xs={12}>
                <hr className={layoutStyle.separator} />
              </Col>
            </Row>
            <CommitHeaderComponent number="02" title="After math" />
            <CommitKnownUserAftermath userAddress={userAddress} />
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state: IAppState) => ({
  userAddress: state.userState.address,
  contractAddress: config.contractsDeployed.commitmentContractAddress,
  transactionPayload: "0x3c7a3aff", // @TODO UNHARDCODE IT!
  minTicketWei: selectMinTicketWei(state.commitmentState),
  estimatedReward: selectEstimatedReward(state.commitmentState),
  loadingEstimatedReward: selectEstimatedRewardLoadingState(state.commitmentState),
  txStarted: state.transactionState.txStarted,
  txHash: state.transactionState.txHash,
  blockOfConfirmation: state.transactionState.blockOfConfirmation,
  currentBlock: state.transactionState.currentBlock,
  error: state.transactionState.error,
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
