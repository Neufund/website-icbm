import * as moment from "moment";
import * as React from "react";
import { connect, Dispatch } from "react-redux";

import { loadIcoParams } from "../actions/loadIcoParams";
import { Incentive } from "../components/Incentive";
import { IAppState } from "../reducers";
import { selectStartDate } from "../reducers/icoState";

interface IBeforeIco {
  startDate: moment.Moment;
  loadIcoParameters: () => {};
}
const BeforeIco: React.SFC<IBeforeIco> = ({ startDate, loadIcoParameters }) =>
  <div>
    <Incentive startDate={startDate} onFinish={loadIcoParameters} />
  </div>;

export function mapStateToProps(state: IAppState) {
  return {
    startDate: selectStartDate(state.icoState),
  };
}

function mapDispatchToProps(dispatch: Dispatch<IAppState>) {
  return {
    loadIcoParameters: () => dispatch(loadIcoParams),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BeforeIco);
