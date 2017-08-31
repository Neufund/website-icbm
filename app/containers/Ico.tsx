import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { IcoPhase } from "../actions/constants";
import { loadIcoParams } from "../actions/loadIcoParams";
import { selectIcoPhase } from "../reducers/icoParameters";
import BeforeIco from "./BeforeIco";
import Countdown from "./Countdown";
import DuringIco from "./DuringIco";

interface IcoProps {
  icoPhase: IcoPhase;
  loadIcoParameters: any;
}

export const Ico: React.SFC<IcoProps> = props => {
  const { icoPhase } = props;
  props.loadIcoParameters();

  // @todo: this should load after did mount
  switch (icoPhase) {
    case IcoPhase.DURING_ICO:
      return <DuringIco />;
    case IcoPhase.BEFORE_ICO:
      return <BeforeIco />;
    default:
      return <BeforeIco />;
    // throw new Error("Not supproted");
  }
};

function mapStateToProps(state: any) {
  return {
    icoPhase: selectIcoPhase(state.icoParameters),
  };
}

function mapDispatchToProps(dispatch: Dispatch<any>) {
  return {
    loadIcoParameters: () => dispatch(loadIcoParams),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Ico);
