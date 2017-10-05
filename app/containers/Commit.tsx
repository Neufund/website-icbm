import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { loadIcoParams } from "../actions/loadIcoParams";
import { loadUserAccount } from "../actions/loadUserAccount";
import { LoadingIndicator } from "../components/LoadingIndicator";
import { IAppState } from "../reducers/index";
import { selectIsKnownUser, selectLoading } from "../reducers/userState";
import CommitKnownUserContainer from "./CommitKnownUserContainer";
import CommitUnknownUserContainer from "./CommitUnknownUserContainer";

const SECOND = 1000;

interface ICommitComponent {
  isKnownUser: boolean;
  isLoading: boolean;
  loadUserAccount: () => {};
  loadIcoParams: () => {};
}

interface ICommitState {
  timerID: number;
}

class Commit extends React.Component<ICommitComponent, ICommitState> {
  constructor(props: ICommitComponent) {
    super(props);
    this.state = {
      timerID: null,
    };
  }

  public componentDidMount() {
    this.props.loadIcoParams();

    const timerID = window.setInterval(() => {
      this.props.loadUserAccount();
    }, SECOND);

    this.setState({
      ...this.state,
      timerID,
    });
  }

  public componentWillUnmount() {
    clearInterval(this.state.timerID);
  }

  public render() {
    const { isKnownUser, isLoading } = this.props;

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
    loadUserAccount: () => dispatch(loadUserAccount),
    loadIcoParams: () => dispatch(loadIcoParams),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Commit);
