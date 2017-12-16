import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { IcoPhase } from "../actions/constants";
import { loadIcoParams } from "../actions/loadIcoParams";
import { LoadingIndicator } from "../components/LoadingIndicator";
import { WhitelistedCommitmentNote } from "../components/WhitelistedCommitmentNote";
import { IAppState } from "../reducers/index";
import AfterIco from "./AfterIco";
import BeforeIco from "./BeforeIco";
import DuringIco from "./DuringIco";

interface IcoProps {
  loading: boolean;
  commitmentState: IcoPhase;
  loadIcoParameters: any;
}

class Ico extends React.Component<IcoProps> {
  public componentDidMount() {
    this.props.loadIcoParameters();
  }

  public render() {
    const { commitmentState, loading } = this.props;

    if (loading) {
      return <LoadingIndicator />;
    }

    switch (commitmentState) {
      case IcoPhase.BEFORE:
        return (
          <div>
            <WhitelistedCommitmentNote />
            <BeforeIco />
          </div>
        );
      case IcoPhase.DURING:
        return (
          <div>
            <WhitelistedCommitmentNote />
            <DuringIco />
          </div>
        );
      case IcoPhase.AFTER:
        return (
          <div>
            <WhitelistedCommitmentNote />
            <AfterIco />
          </div>
        );
      default:
        throw new Error(`Phase ${commitmentState} not supported!`);
    }
  }
}

function mapStateToProps(state: IAppState) {
  return {
    loading: state.commitmentState.loading,
    commitmentState: state.commitmentState.commitmentState,
  };
}

function mapDispatchToProps(dispatch: Dispatch<any>) {
  return {
    loadIcoParameters: () => dispatch(loadIcoParams),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Ico);
