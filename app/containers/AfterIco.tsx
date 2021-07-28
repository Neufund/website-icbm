import * as BigNumber from "bignumber.js";
import { Moment } from "moment";
import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { loadDuringIcoDetails } from "../actions/loadDuringIcoDetails";
import { AfterIcoSumup } from "../components/AfterIcoSumup";
import { selectEndDate } from "../reducers/commitmentState";
import {
  selectAllFundsInEuro,
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
  endDate: Moment;
}

export class AfterIco extends React.Component<IAfterIcoProps> {
  public componentDidMount() {
    this.props.loadDuringIcoDetail();
  }

  public render() {
    return <AfterIcoSumup />;
  }
}

function mapStateToProps(state: IAppState) {
  return {
    loading: selectLoadingState(state.duringIcoState),
    totalSupply: selectInvestorsNeumarks(state.duringIcoState),
    issuanceRate: selectIssuanceRate(state.duringIcoState),
    allFunds: selectAllFundsInEuro(state.duringIcoState),
    allInvestors: selectAllInvestors(state.duringIcoState),
    endDate: selectEndDate(state.commitmentState),
  };
}

function mapDispatchToProps(dispatch: Dispatch<any>) {
  return {
    loadDuringIcoDetail: () => dispatch(loadDuringIcoDetails),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AfterIco as any);
