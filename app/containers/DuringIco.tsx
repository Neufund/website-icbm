import * as BigNumber from "bignumber.js";
import * as moment from "moment";
import * as React from "react";
import { connect } from "react-redux";
import { compose, Dispatch } from "redux";

import { loadDuringIcoDetails } from "../actions/loadDuringIcoDetails";
import { DuringIcoCountdown } from "../components/DuringIcoCountdown";
import { watchAction } from "../components/WatchActionHoc";
import { selectEndDate } from "../reducers/commitmentState";
import {
  selectAllFunds,
  selectAllInvestors,
  selectInvestorsNeumarks,
  selectIssuanceRate,
  selectLoadingState,
} from "../reducers/duringIcoState";
import { IAppState } from "../reducers/index";

interface IDuringIcoProps {
  loadIcoStats: () => any;
  loadDuringIcoDetail: () => any;
  finishDate: moment.Moment;
  loading: boolean;
  totalSupply?: BigNumber.BigNumber;
  issuanceRate?: BigNumber.BigNumber;
  allFunds?: BigNumber.BigNumber;
  allInvestors?: BigNumber.BigNumber;
}

export class DuringIco extends React.Component<IDuringIcoProps> {
  public componentDidMount() {
    this.props.loadDuringIcoDetail();
  }

  public render() {
    return (
      <DuringIcoCountdown
        loading={this.props.loading}
        raised={this.props.allFunds}
        neuMarkAmount={this.props.totalSupply}
        neuMarkToEtherRatio={this.props.issuanceRate}
        investorsAccountCreated={this.props.allInvestors}
        finishDate={this.props.finishDate}
      />
    );
  }
}

function mapStateToProps(state: IAppState) {
  return {
    finishDate: selectEndDate(state.commitmentState),
    loading: selectLoadingState(state.duringIcoState),
    totalSupply: selectInvestorsNeumarks(state.duringIcoState),
    issuanceRate: selectIssuanceRate(state.duringIcoState),
    allFunds: selectAllFunds(state.duringIcoState),
    allInvestors: selectAllInvestors(state.duringIcoState),
  };
}

function mapDispatchToProps(dispatch: Dispatch<any>) {
  return {
    loadDuringIcoDetail: () => dispatch(loadDuringIcoDetails),
  };
}

const WATCH_ACTION_INTERVAL = 30000;

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  watchAction(WATCH_ACTION_INTERVAL, "loadDuringIcoDetail")
)(DuringIco as any);
