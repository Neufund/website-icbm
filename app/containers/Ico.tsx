import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { IcoPhase } from "../actions/constants";
import { loadIcoParams } from "../actions/loadIcoParams";
import { IAppState } from "../reducers/index";
import BeforeIco from "./BeforeIco";
// import DuringIco from "./DuringIco";

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
      return <div>Loading...</div>;
    }

    switch (commitmentState) {
      case IcoPhase.BEFORE:
        return <BeforeIco />;
      // case CommitmentState.WHITELIST:
      // case CommitmentState.PUBLIC: // @todo here we want to present only public when its deployed for public
      //   return <DuringIco />;
      // @todo we need better way to realize loading state and ofc improve design
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
