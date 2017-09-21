import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
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
}

class Commit extends React.Component<ICommitComponent> {
  public componentDidMount() {
    this.props.loadUserAccounts();
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Commit);
