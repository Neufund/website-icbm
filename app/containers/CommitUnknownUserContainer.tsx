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
import { selectIsAccepted } from "../reducers/legalAgreementState";
import { publicCommitment } from "../web3/contracts/ContractsRepository";
import AddressChooserModalContainer from "./AddressChooserModalContainer";
import * as layoutStyle from "./CommitLayoutStyles.scss";
import CommitUnknownUserAftermathContainer from "./CommitUnknownUserAftermathContainer";

interface ICommitUnknownUserContainer {
  agreementAccepted: boolean;
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
  showChooseAddressDialog: boolean;
  handleAddressChosen: (derivationPath: string, address: string) => void;
}

export const CommitUnknownUserContainer: React.SFC<ICommitUnknownUserContainer> = ({
  agreementAccepted,
  contractAddress,
  transactionPayload,
  gasPrice,
  gasLimit,
  estimatedReward,
  loadingEstimatedReward,
  calculateEstimatedRewardAction,
  minTicketWei,
  showChooseAddressDialog,
  handleAddressChosen,
}) => {
  return (
    <div>
      <LegalModal />
      {showChooseAddressDialog &&
        agreementAccepted &&
        <AddressChooserModalContainer handleAddressChosen={handleAddressChosen} />}
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

interface IStateFromProps {
  agreementAccepted: boolean;
  contractAddress: string;
  transactionPayload: string;
  gasPrice: string;
  gasLimit: string;
  loadingEstimatedReward: boolean;
  estimatedReward: BigNumber;
  minTicketWei: BigNumber;
}

const mapStateToProps = (state: IAppState): IStateFromProps => ({
  agreementAccepted: selectIsAccepted(state.legalAgreementState),
  contractAddress: config.contractsDeployed.commitmentContractAddress,
  transactionPayload: publicCommitment.rawWeb3Contract.commit.getData(),
  gasPrice: config.contractsDeployed.gasPrice,
  gasLimit: config.contractsDeployed.gasLimit,
  loadingEstimatedReward: selectEstimatedRewardLoadingState(state.commitmentState),
  estimatedReward: selectEstimatedReward(state.commitmentState),
  minTicketWei: selectMinTicketWei(state.commitmentState),
});

interface IDispatchFromProps {
  calculateEstimatedRewardAction: () => {};
}

function mapDispatchToProps(dispatch: Dispatch<any>): IDispatchFromProps {
  return {
    calculateEstimatedRewardAction: debounce(
      () => dispatch(calculateEstimatedReward) as () => {},
      300
    ) as () => {},
  };
}

interface IPropsFromProps {
  showChooseAddressDialog: boolean;
  handleAddressChosen: (derivationPath: string, address: string) => void;
}

export default connect<IStateFromProps, IDispatchFromProps, IPropsFromProps>(
  mapStateToProps,
  mapDispatchToProps
)(CommitUnknownUserContainer);
