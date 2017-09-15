import { BigNumber } from "bignumber.js";
import * as moment from "moment";
import * as React from "react";
import { Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { Aftermath } from "../components/Aftermath";
import { CommitFundsStatic } from "../components/CommitFundsStatic";
import { CommitHeaderComponent } from "../components/CommitHeaderComponent";
import { CommitNavbar } from "../components/CommitNavbar";
import LegalModal from "../components/LegalModal";
import * as layoutStyle from "./CommitLayoutStyles.scss";

interface ICommitUnknownUserContainer {
  contractAddress: string;
  transactionPayload: string;
  gasPrice: string;
  gasLimit: string;
  lockedAmount: BigNumber;
  unlockDate: moment.Moment;
  neumarkBalance: BigNumber;
}

export const CommitUnknownUserContainer: React.SFC<ICommitUnknownUserContainer> = ({
  contractAddress,
  transactionPayload,
  gasPrice,
  gasLimit,
  lockedAmount,
  neumarkBalance,
  unlockDate,
}) => {
  return (
    <div className={layoutStyle.pageContainer}>
      <LegalModal />
      <CommitNavbar>Commit funds in Neufund Commitment Opportunity</CommitNavbar>
      <Row>
        <Col sm={10} smOffset={1} className={layoutStyle.contentContainer}>
          <CommitHeaderComponent number="01" title="Commit details" />
          <CommitFundsStatic
            contractAddress={contractAddress}
            transactionPayload={transactionPayload}
            gasPrice={gasPrice}
            gasLimit={gasLimit}
          />
          <Row>
            <Col sm={12}>
              <hr className={layoutStyle.separator} />
            </Col>
          </Row>
          <CommitHeaderComponent number="02" title="After math" />
          <Aftermath
            userAddress="this component has to be finished"
            lockedAmount={lockedAmount}
            neumarkBalance={neumarkBalance}
            unlockDate={unlockDate}
          />
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = () => ({
  contractAddress: "0x6895304785c271b827f1990860d5093e30d2a121",
  transactionPayload: "0x3c7a3aff",
  gasPrice: "5440",
  gasLimit: "2000000",
  lockedAmount: new BigNumber(5),
  neumarkBalance: new BigNumber(123),
  unlockDate: moment(),
});

export default connect(mapStateToProps)(CommitUnknownUserContainer);