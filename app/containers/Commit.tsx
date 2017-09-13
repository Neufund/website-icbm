import * as React from "react";
import { Col, Row } from "react-bootstrap";
import { CommitFundsDescription } from "../components/CommitFundsDescription";
import CommitFundsForm from "../components/CommitFundsForm";
import { CommitNavbar } from "../components/CommitNavbar";
import { UserAddressComponent } from "../components/UserAddressComponent";
import * as style from "./Commit.scss";

interface ICommitComponent {
  userAddress: string;
  contractAddress: string;
  transactionPayload: string;
}

const CommitComponent: React.SFC<ICommitComponent> = ({
  userAddress,
  contractAddress,
  transactionPayload,
}) =>
  <div>
    <Row>
      <Col sm={6}>
        <UserAddressComponent address={userAddress} />
      </Col>
    </Row>
    <Row className={style.formRow}>
      <Col sm={6}>
        <CommitFundsForm />
      </Col>
      <Col sm={6}>
        <CommitFundsDescription
          contractAddress={contractAddress}
          transactionPayload={transactionPayload}
        />
      </Col>
    </Row>
  </div>;

interface IHeaderComponent {
  number: string;
  title: string;
}

const HeaderComponent: React.SFC<IHeaderComponent> = ({ number, title }) =>
  <Row>
    <Col sm={12}>
      <h2 className={style.sectionHeader}>
        <span className={style.headerNumber}>
          {number}
        </span>
        {title}
      </h2>
    </Col>
  </Row>;

export const Commit: React.SFC = () => {
  return (
    <div className={style.pageContainer}>
      <CommitNavbar>Commit funds in Neufund Commitment Opportunity</CommitNavbar>
      <Row>
        <Col sm={10} smOffset={1} className={style.contentContainer}>
          <HeaderComponent number="01" title="Commit funds" />
          <CommitComponent
            userAddress="0x6ddfa40a2631348c2bd4b0c949ade1712b44587641c3309c5e8d2b914151ed50"
            contractAddress="0x6895304785c271b827f1990860d5093e30d2a121"
            transactionPayload="0x3c7a3aff"
          />
          <Row>
            <Col sm={12}>
              <hr className={style.separator} />
            </Col>
          </Row>
          <HeaderComponent number="02" title="After math" />
        </Col>
      </Row>
    </div>
  );
};

export default Commit;
