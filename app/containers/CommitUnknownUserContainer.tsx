import { BigNumber } from "bignumber.js";
import { debounce } from "lodash";
import * as moment from "moment";
import * as React from "react";
import { Col, Grid, Row } from "react-bootstrap";
import { connect, Dispatch } from "react-redux";
import { calculateEstimatedReward } from "../actions/submitFunds";
import { CommitHeaderComponent } from "../components/commitfunds/CommitHeaderComponent";
import { CommitNavbar } from "../components/commitfunds/CommitNavbar";
import { CommitUnknownUser } from "../components/commitfunds/CommitUnknownUser";
import LegalModal from "../components/LegalModal";
import config from "../config";
import {
  selectEstimatedReward,
  selectEstimatedRewardLoadingState,
  selectMinTicketWei,
} from "../reducers/commitmentState";
import { IAppState } from "../reducers/index";
import { publicCommitment } from "../web3/contracts/ContractsRepository";
import * as layoutStyle from "./CommitLayoutStyles.scss";
import CommitUnknownUserAftermathContainer from "./CommitUnknownUserAftermathContainer";

interface ICommitUnknownUserContainer {
  contractAddress: string;
  transactionPayload: string;
  gasPrice: string;
  gasLimit: string;
  lockedAmount: BigNumber;
  unlockDate: moment.Moment;
  neumarkBalance: BigNumber;
  estimatedReward: BigNumber;
  loadingEstimatedReward: boolean;
  calculateEstimatedRewardAction: () => {};
  minTicketWei: BigNumber;
}

export const CommitUnknownUserContainer: React.SFC<ICommitUnknownUserContainer> = ({
  contractAddress,
  transactionPayload,
  gasPrice,
  gasLimit,
  estimatedReward,
  loadingEstimatedReward,
  calculateEstimatedRewardAction,
  minTicketWei,
}) => {
  return (
    <div>
      <LegalModal />
      <CommitNavbar>Commit funds in Neufund Commitment Opportunity</CommitNavbar>
      <Grid>
        <Row>
          <Col xs={12} className={layoutStyle.contentContainer}>
            <CommitHeaderComponent number="01" title="Commit details" />
            <CommitUnknownUser
              contractAddress={contractAddress}
              transactionPayload={transactionPayload}
              gasPrice={gasPrice}
              gasLimit={gasLimit}
              estimatedReward={estimatedReward}
              loadingEstimatedReward={loadingEstimatedReward}
              calculateEstimatedRewardAction={calculateEstimatedRewardAction}
              minTicketWei={minTicketWei}
            />
            <Row>
              <Col xs={12}>
                <hr className={layoutStyle.separator} />
              </Col>
            </Row>
            <CommitHeaderComponent number="02" title="After math" />
            <CommitUnknownUserAftermathContainer />
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state: IAppState) => ({
  contractAddress: config.contractsDeployed.commitmentContractAddress,
  transactionPayload: publicCommitment.rawWeb3Contract.commit.getData(),
  gasPrice: config.contractsDeployed.gasPrice,
  gasLimit: config.contractsDeployed.gasLimit,
  loadingEstimatedReward: selectEstimatedRewardLoadingState(state.commitmentState),
  estimatedReward: selectEstimatedReward(state.commitmentState),
  minTicketWei: selectMinTicketWei(state.commitmentState),
});

function mapDispatchToProps(dispatch: Dispatch<any>) {
  return {
    calculateEstimatedRewardAction: debounce(
      () => dispatch(calculateEstimatedReward) as () => {},
      300
    ) as () => {},
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommitUnknownUserContainer);
