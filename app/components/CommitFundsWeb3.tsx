import * as React from "react";
import { Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { IAppState } from "../reducers/index";
import CommitFundsDescription from "./CommitFundsDescription";
import CommitFundsForm from "./CommitFundsForm";
import * as style from "./CommitFundsWeb3.scss";
import { UserAddressComponent } from "./UserAddressComponent";

interface ICommitFundsWeb3 {
  userAddress: string;
}

export const CommitFundsWeb3: React.SFC<ICommitFundsWeb3> = ({ userAddress }) =>
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
        <CommitFundsDescription />
      </Col>
    </Row>
  </div>;

const mapStateToProps = (state: IAppState) => {
  return {
    userAddress: state.userState.address,
  };
};

export default connect(mapStateToProps)(CommitFundsWeb3);
