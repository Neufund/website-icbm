import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { IcoPhase } from "../actions/constants";
import { loadIcoParams } from "../actions/loadIcoParams";
import { LoadingIndicator } from "../components/LoadingIndicator";
import { IAppState } from "../reducers/index";
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
        return <BeforeIco />;
      case IcoPhase.DURING:
        return <DuringIco />;
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
