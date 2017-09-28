import { BigNumber } from "bignumber.js";
import * as moment from "moment";
import * as React from "react";
import { Col, Grid, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { CommitHeaderComponent } from "../components/commitfunds/CommitHeaderComponent";
import { CommitNavbar } from "../components/commitfunds/CommitNavbar";
import { CommitUnknownUser } from "../components/commitfunds/CommitUnknownUser";
import LegalModal from "../components/LegalModal";
import config from "../config";
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
  estimationCoefficient: number;
}

export const CommitUnknownUserContainer: React.SFC<ICommitUnknownUserContainer> = ({
  contractAddress,
  transactionPayload,
  gasPrice,
  gasLimit,
  estimationCoefficient,
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
              estimationCoefficient={estimationCoefficient}
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

const mapStateToProps = () => ({
  contractAddress: config.contractsDeployed.commitmentContractAddress,
  transactionPayload: publicCommitment.rawWeb3Contract.commit.getData(),
  gasPrice: config.contractsDeployed.gasPrice,
  gasLimit: config.contractsDeployed.gasLimit,
  estimationCoefficient: 5, // unhardcode it
});

export default connect(mapStateToProps)(CommitUnknownUserContainer);
