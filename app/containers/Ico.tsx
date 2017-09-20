import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { IcoPhase } from "../actions/constants";
import { loadIcoParams } from "../actions/loadIcoParams";
import { selectIcoState } from "../reducers/icoState";
import { IAppState } from "../reducers/index";
import BeforeIco from "./BeforeIco";
import DuringIco from "./DuringIco";

interface IcoProps {
  icoPhase: IcoPhase;
  loadIcoParameters: any;
}

class Ico extends React.Component<IcoProps> {
  public componentDidMount() {
    this.props.loadIcoParameters();
  }

  public render() {
    const { icoPhase } = this.props;

    switch (icoPhase) {
      case IcoPhase.BEFORE_ICO:
        return <BeforeIco />;
      case IcoPhase.DURING_ICO:
        return <DuringIco />;
      // @todo we need better way to realize loading state and ofc improve design
      case IcoPhase.UNKNOWN:
        return <div>Loading...</div>;
      default:
        throw new Error(`Phase ${icoPhase} not supported!`);
    }
  }
}

function mapStateToProps(state: IAppState) {
  return {
    icoPhase: selectIcoState(state.icoState),
  };
}

function mapDispatchToProps(dispatch: Dispatch<any>) {
  return {
    loadIcoParameters: () => dispatch(loadIcoParams),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Ico);
