import * as React from "react";
import { connect } from "react-redux";
import { IAppState } from "../reducers/index";
import CommitKnownUserContainer from "./CommitKnownUserContainer";
import CommitUnknownUserContainer from "./CommitUnknownUserContainer";

interface ICommitComponent {
  knownUser: boolean;
}

const CommitComponent: React.SFC<ICommitComponent> = ({ knownUser }) =>
  knownUser ? <CommitKnownUserContainer /> : <CommitUnknownUserContainer />;

const mapStateToProps = (state: IAppState) => {
  return {
    knownUser: state.userState.address !== null,
  };
};

export default connect(mapStateToProps)(CommitComponent);
