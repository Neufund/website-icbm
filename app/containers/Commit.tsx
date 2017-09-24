import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { loadIcoParams } from "../actions/loadIcoParams";
import { loadUserAccounts } from "../actions/loadUserAccounts";
import { LoadingIndicator } from "../components/LoadingIndicator";
import { IAppState } from "../reducers/index";
import { selectIsKnownUser, selectLoading } from "../reducers/userState";
import CommitKnownUserContainer from "./CommitKnownUserContainer";
import CommitUnknownUserContainer from "./CommitUnknownUserContainer";

interface ICommitComponent {
  isKnownUser: boolean;
  isLoading: boolean;
  loadUserAccounts: () => {};
  loadIcoParams: () => {};
}

class Commit extends React.Component<ICommitComponent> {
  public componentDidMount() {
    this.props.loadUserAccounts();
    this.props.loadIcoParams();
  }

  public render() {
    const { isLoading, isKnownUser } = this.props;

    if (isLoading) {
      return <LoadingIndicator />;
    }

    return isKnownUser ? <CommitKnownUserContainer /> : <CommitUnknownUserContainer />;
  }
}

const mapStateToProps = (state: IAppState) => {
  return {
    isKnownUser: selectIsKnownUser(state.userState),
    isLoading: selectLoading(state.userState),
  };
};

function mapDispatchToProps(dispatch: Dispatch<any>) {
  return {
    loadUserAccounts: () => dispatch(loadUserAccounts),
    loadIcoParams: () => dispatch(loadIcoParams),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Commit);
