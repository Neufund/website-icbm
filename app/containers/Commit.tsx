import * as jQuery from "jquery";
import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { initCommit } from "../actions/commit";
import { Web3Type } from "../actions/constants";
import { FatalErrorComponent } from "../components/FatalErrorComponent";
import { LoadingIndicator } from "../components/LoadingIndicator";
import { IAppState } from "../reducers/index";
import { selectIsKnownUser, selectLoading } from "../reducers/userState";
import { selectWeb3Type } from "../reducers/web3State";
import CommitKnownUserContainer from "./CommitKnownUserContainer";
import CommitUnknownUserContainer from "./CommitUnknownUserContainer";

interface ICommitComponent {
  fatalError: string;
  isKnownUser: boolean;
  isLoading: boolean;
  initCommit: () => {};
  web3Type: Web3Type;
}

class Commit extends React.Component<ICommitComponent> {
  constructor(props: ICommitComponent) {
    super(props);
    this.state = {
      timerID: null,
      showChooseAddressDialog: false,
    };
  }

  public async componentDidMount() {
    await this.props.initCommit();
    jQuery(".footer").removeClass("hidden"); // this has to be done this ugly way as footer is created outside of react app
  }

  public render() {
    const { fatalError, isKnownUser, isLoading } = this.props;

    if (fatalError) {
      return <FatalErrorComponent fatalError={fatalError} />;
    }

    if (isLoading) {
      return <LoadingIndicator />;
    }

    if (this.props.children !== null) {
      return (
        <div>
          {this.props.children}
        </div>
      );
    }

    return isKnownUser ? <CommitKnownUserContainer /> : <CommitUnknownUserContainer />;
  }
}

const mapStateToProps = (state: IAppState) => {
  return {
    fatalError: state.fatalErrorState.fatalError,
    isKnownUser: selectIsKnownUser(state.userState, state.web3State),
    isLoading: selectLoading(state.userState),
    web3Type: selectWeb3Type(state.web3State),
  };
};

function mapDispatchToProps(dispatch: Dispatch<any>) {
  return {
    initCommit: () => dispatch(initCommit),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Commit);
