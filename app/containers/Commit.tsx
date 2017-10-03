import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { loadIcoParams } from "../actions/loadIcoParams";
import { loadUserAccount } from "../actions/loadUserAccount";
import { IAppState } from "../reducers/index";
import { selectIsKnownUser } from "../reducers/userState";
import CommitKnownUserContainer from "./CommitKnownUserContainer";
import CommitUnknownUserContainer from "./CommitUnknownUserContainer";

interface ICommitComponent {
  isKnownUser: boolean;
  loadUserAccount: () => {};
  loadIcoParams: () => {};
}

class Commit extends React.Component<ICommitComponent> {
  public componentDidMount() {
    this.props.loadUserAccount();
    this.props.loadIcoParams();
  }

  public render() {
    const { isKnownUser } = this.props;
    return isKnownUser ? <CommitKnownUserContainer /> : <CommitUnknownUserContainer />;
  }
}

const mapStateToProps = (state: IAppState) => {
  return {
    isKnownUser: selectIsKnownUser(state.userState),
  };
};

function mapDispatchToProps(dispatch: Dispatch<any>) {
  return {
    loadUserAccount: () => dispatch(loadUserAccount),
    loadIcoParams: () => dispatch(loadIcoParams),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Commit);
