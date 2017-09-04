import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { IcoPhase } from "../actions/constants";
import { loadIcoParams } from "../actions/loadIcoParams";
import { selectIcoPhase } from "../reducers/icoParameters";
import BeforeIco from "./BeforeIco";
import DuringIco from "./DuringIco";

interface IcoProps {
  icoPhase: IcoPhase;
  icoParameters: any;
  loadIcoParameters: any;
}

export class Ico extends React.Component<IcoProps> {
  public componentDidMount() {
    const { loadIcoParameters } = this.props;
    loadIcoParameters();
  }

  public render() {
    const { icoPhase, icoParameters } = this.props;

    if (icoParameters.loading) {
      return <div>Loading ...</div>;
    }

    switch (icoPhase) {
      case IcoPhase.DURING_ICO:
        return <DuringIco />;
      case IcoPhase.BEFORE_ICO:
        return <BeforeIco />;
      default:
        throw new Error("Not supproted");
    }
  }
}

function mapStateToProps(state: any) {
  return {
    icoPhase: selectIcoPhase(state.icoParameters),
    icoParameters: state.icoParameters,
  };
}

function mapDispatchToProps(dispatch: Dispatch<any>) {
  return {
    loadIcoParameters: () => dispatch(loadIcoParams),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Ico);
