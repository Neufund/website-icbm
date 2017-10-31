import * as jQuery from "jquery";
import * as React from "react";
import { Col, Grid, Row } from "react-bootstrap";
import { connect } from "react-redux";

import { CommitHeaderComponent } from "../components/commitfunds/CommitHeaderComponent";
import { CommitNavbar } from "../components/commitfunds/CommitNavbar";
import LegalModal from "../components/LegalModal";
import CommitKnownUserAftermathContainer from "../containers/CommitKnownUserAftermathContainer";
import { IAppState } from "../reducers/index";
import { selectIsKnownUser } from "../reducers/userState";
import * as layoutStyle from "./CommitLayoutStyles.scss";
import CommitUnknownUserAftermathContainer from "./CommitUnknownUserAftermathContainer";

interface IAfterMathContainer {
  isKnownUser: boolean;
}

export const AfterMathContainer: React.SFC<IAfterMathContainer> = ({ isKnownUser }) => {
  jQuery(".footer").removeClass("hidden"); // this has to be done this ugly way as footer is created outside of react app
  return (
    <div>
      <LegalModal />
      <CommitNavbar>Commit funds in Neufund Commitment Opportunity</CommitNavbar>
      <Grid>
        <Row>
          <Col xs={12} className={layoutStyle.contentContainer}>
            <CommitHeaderComponent number="01" title="After math" />
            {isKnownUser
              ? <CommitKnownUserAftermathContainer />
              : <CommitUnknownUserAftermathContainer />}
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state: IAppState) => {
  return {
    isKnownUser: selectIsKnownUser(state.userState),
  };
};

export default connect(mapStateToProps)(AfterMathContainer);
