import * as moment from "moment";
import * as React from "react";
import { connect } from "react-redux";

import { Incentive } from "../components/Incentive";
import { selectStartDate } from "../reducers/icoState";
import { IAppState } from "../reducers/index";

interface IBeforeIco {
  startDate: moment.Moment;
}
const BeforeIco: React.SFC<IBeforeIco> = ({ startDate }) =>
  <div>
    {/* @Todo Remove this */}
    <Incentive startDate={startDate} />
  </div>;

export function mapStateToProps(state: IAppState) {
  // @todo state
  return {
    startDate: selectStartDate(state.icoState),
  };
}

export default connect(mapStateToProps)(BeforeIco);
