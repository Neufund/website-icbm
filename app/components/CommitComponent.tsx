import { BigNumber } from "bignumber.js";
import * as moment from "moment";
import * as React from "react";
import { Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { IAppState } from "../reducers/index";
import { Aftermath } from "./Aftermath";
import * as style from "./CommitComponent.scss";
import { CommitFundsStatic } from "./CommitFundsStatic";
import CommitFundsWeb3 from "./CommitFundsWeb3";
import { CommitNavbar } from "./CommitNavbar";

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

interface ICommitComponent {
  knownUser: boolean;
}

export const CommitComponent: React.SFC<ICommitComponent> = ({ knownUser }) => {
  const section1Title = knownUser ? "Commit funds" : "Commit details";
  return (
    <div className={style.pageContainer}>
      <CommitNavbar>Commit funds in Neufund Commitment Opportunity</CommitNavbar>
      <Row>
        <Col sm={10} smOffset={1} className={style.contentContainer}>
          <HeaderComponent number="01" title={section1Title} />
          {knownUser ? <CommitFundsWeb3 /> : <CommitFundsStatic />}
          <Row>
            <Col sm={12}>
              <hr className={style.separator} />
            </Col>
          </Row>
          <HeaderComponent number="02" title="After math" />
          <Aftermath
            address="0x123123"
            lockedAmount={new BigNumber(5)}
            neumarkBalance={new BigNumber(123)}
            unlockDate={moment()}
          />
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (state: IAppState) => {
  return {
    knownUser: state.userState.address !== null,
  };
};

export default connect(mapStateToProps)(CommitComponent);
