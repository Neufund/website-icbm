import * as React from "react";
import { Col, Row } from "react-bootstrap";
import { connect } from "react-redux";

import { CommitHeaderComponent } from "../components/commitfunds/CommitHeaderComponent";
import CommitKnownUserAftermathContainer from "../containers/CommitKnownUserAftermathContainer";
import { IAppState } from "../reducers/index";
import { selectIsKnownUser } from "../reducers/userState";
import * as layoutStyle from "./CommitLayoutStyles.scss";
import CommitUnknownUserAftermathContainer from "./CommitUnknownUserAftermathContainer";

interface IAfterMathContainer {
  isKnownUser: boolean;
}

export const AfterMathContainer: React.SFC<IAfterMathContainer> = ({ isKnownUser }) =>
  <Row>
    <Col xs={12} className={layoutStyle.contentContainer}>
      <CommitHeaderComponent number="04" title="After math" />
      {isKnownUser
        ? <CommitKnownUserAftermathContainer />
        : <CommitUnknownUserAftermathContainer />}
    </Col>
  </Row>;

const mapStateToProps = (state: IAppState) => {
  return {
    isKnownUser: selectIsKnownUser(state.userState, state.web3State),
  };
};

export default connect(mapStateToProps)(AfterMathContainer);
