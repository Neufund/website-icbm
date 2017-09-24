import { BigNumber } from "bignumber.js";
import { debounce } from "lodash";
import * as moment from "moment";
import * as React from "react";
import { Col, Grid, Row } from "react-bootstrap";
import { connect, Dispatch } from "react-redux";
import { calculateEstimatedReward, submitFunds } from "../actions/submitFunds";
import { CommitHeaderComponent } from "../components/commitfunds/CommitHeaderComponent";
import { CommitKnownUser } from "../components/commitfunds/CommitKnownUser";
import { CommitKnownUserAftermath } from "../components/commitfunds/CommitKnownUserAftermath";
import { ICommitKnownUserFormValues } from "../components/commitfunds/CommitKnownUserForm";
import { CommitNavbar } from "../components/commitfunds/CommitNavbar";
import LegalModal from "../components/LegalModal";
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
  lockedAmount: BigNumber;
  unlockDate: moment.Moment;
  neumarkBalance: BigNumber;
  minTicketWei: BigNumber;
  calculateEstimatedRewardAction?: () => {};
  estimatedReward: BigNumber;
  loadingEstimatedReward: boolean;
  submitFundsAction: (values: ICommitKnownUserFormValues) => {};
}

export const CommitKnownUserContainer: React.SFC<ICommitKnownUserContainer> = ({
  userAddress,
  contractAddress,
  transactionPayload,
  lockedAmount,
  neumarkBalance,
  unlockDate,
  submitFundsAction,
  minTicketWei,
  calculateEstimatedRewardAction,
  loadingEstimatedReward,
  estimatedReward,
}) => {
  return (
    <div>
      <LegalModal />
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
            <CommitKnownUserAftermath
              userAddress={userAddress}
              lockedAmount={lockedAmount}
              neumarkBalance={neumarkBalance}
              unlockDate={unlockDate}
            />
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state: IAppState) => ({
  userAddress: state.userState.selectedAddress,
  contractAddress: "0x6895304785c271b827f1990860d5093e30d2a121",
  transactionPayload: "0x3c7a3aff",
  lockedAmount: new BigNumber(5),
  neumarkBalance: new BigNumber(123),
  unlockDate: moment(),
  minTicketWei: selectMinTicketWei(state.commitmentState),
  estimatedReward: selectEstimatedReward(state.commitmentState),
  loadingEstimatedReward: selectEstimatedRewardLoadingState(state.commitmentState),
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
