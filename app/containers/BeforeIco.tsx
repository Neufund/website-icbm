import * as moment from "moment";
import * as React from "react";
import { connect } from "react-redux";

import { Incentive } from "../components/Incentive";
import { selectStartDate } from "../reducers/icoParameters";
import { loadIcoStats } from "../web3/loadIcoStats";

interface IBeforeIco {
  startDate: moment.Moment;
}
const BeforeIco: React.SFC<IBeforeIco> = ({ startDate }) => (
  <div>
    {/* @Todo Remove this */}
    <Incentive startDate={startDate} />
  </div>
);

export function mapStateToProps(state: any) {
  // @todo state
  return {
    startDate: selectStartDate(state.icoParameters),
  };
}

export default connect(mapStateToProps)(BeforeIco);
