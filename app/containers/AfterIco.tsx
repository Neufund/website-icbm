import * as BigNumber from "bignumber.js";
import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { loadDuringIcoDetails } from "../actions/loadDuringIcoDetails";
import { AfterIcoSumup } from "../components/AfterIcoSumup";
import {
  selectAllFunds,
  selectAllInvestors,
  selectInvestorsNeumarks,
  selectIssuanceRate,
  selectLoadingState,
} from "../reducers/duringIcoState";
import { IAppState } from "../reducers/index";

interface IAfterIcoProps {
  loadIcoStats: () => any;
  loadDuringIcoDetail: () => any;
  loading: boolean;
  totalSupply?: BigNumber.BigNumber;
  issuanceRate?: BigNumber.BigNumber;
  allFunds?: BigNumber.BigNumber;
  allInvestors?: BigNumber.BigNumber;
}

export class AfterIco extends React.Component<IAfterIcoProps> {
  public componentDidMount() {
    this.props.loadDuringIcoDetail();
  }

  public render() {
    return (
      <AfterIcoSumup
        loading={this.props.loading}
        raised={this.props.allFunds}
        neuMarkAmount={this.props.totalSupply}
        neuMarkToEtherRatio={this.props.issuanceRate}
        investorsAccountCreated={this.props.allInvestors}
      />
    );
  }
}

function mapStateToProps(state: IAppState) {
  return {
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

export default connect(mapStateToProps, mapDispatchToProps)(AfterIco as any);
