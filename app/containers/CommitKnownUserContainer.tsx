import { BigNumber } from "bignumber.js";
import * as moment from "moment";
import * as React from "react";
import { Col, Grid, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { CommitHeaderComponent } from "../components/commitfunds/CommitHeaderComponent";
import { CommitKnownUser } from "../components/commitfunds/CommitKnownUser";
import { CommitKnownUserAftermath } from "../components/commitfunds/CommitKnownUserAftermath";
import { CommitNavbar } from "../components/commitfunds/CommitNavbar";
import LegalModal from "../components/LegalModal";
import { IAppState } from "../reducers/index";
import * as layoutStyle from "./CommitLayoutStyles.scss";

interface ICommitKnownUserContainer {
  userAddress: string;
  contractAddress: string;
  transactionPayload: string;
  lockedAmount: BigNumber;
  unlockDate: moment.Moment;
  neumarkBalance: BigNumber;
  estimationCoefficient: number;
}

export const CommitKnownUserContainer: React.SFC<ICommitKnownUserContainer> = ({
  userAddress,
  contractAddress,
  transactionPayload,
  lockedAmount,
  neumarkBalance,
  unlockDate,
  estimationCoefficient,
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
              estimationCoefficient={estimationCoefficient}
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
  userAddress: state.userState.address,
  contractAddress: "0x6895304785c271b827f1990860d5093e30d2a121",
  transactionPayload: "0x3c7a3aff",
  gasPrice: "5440",
  gasLimit: "2000000",
  lockedAmount: new BigNumber(5),
  neumarkBalance: new BigNumber(123),
  unlockDate: moment(),
  estimationCoefficient: 5,
});

export default connect(mapStateToProps)(CommitKnownUserContainer);
