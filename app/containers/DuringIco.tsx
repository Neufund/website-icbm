import * as moment from "moment";
import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { loadIcoParams } from "../actions/loadIcoParams";
import { DuringIcoCountdown } from "../components/DuringIcoCountdown";
import { selectEndDate } from "../reducers/icoState";
import { IAppState } from "../reducers/index";

interface IDuringIcoProps {
  loadIcoStats: () => any;
  finishDate: moment.Moment;
  loading: boolean;
}

export class DuringIco extends React.Component<IDuringIcoProps> {
  public render() {
    const { loading } = this.props;

    // @todo: implement loading component
    if (loading) {
      return <div>Loading ...</div>;
    }

    /*
    @todo: the below data is hard coded supposed to be from the smart contract,
    change it after connecting the web3 with smart contract.
    */
    return (
      <DuringIcoCountdown
        raised={10000000}
        neuMarkAmount={10000}
        neuMarkToEtherRatio={8.25}
        investorsAccountCreated={20000}
        finishDate={this.props.finishDate}
      />
    );
  }
}

function mapStateToProps(state: IAppState) {
  return {
    loading: state.icoState.loading,
    finishDate: selectEndDate(state.icoState),
  };
}

function mapDispatchToProps(dispatch: Dispatch<any>) {
  return {
    loadIcoStats: () => dispatch(loadIcoParams),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DuringIco);
