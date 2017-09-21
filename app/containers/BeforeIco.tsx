import * as moment from "moment";
import * as React from "react";
import { connect, Dispatch } from "react-redux";

import { loadBeforeIcoDetails } from "../actions/loadBeforeIcoDetails";
import { loadIcoParams } from "../actions/loadIcoParams";
import { Incentive } from "../components/Incentive";
import { IAppState } from "../reducers";
import { selectNeumarkInitialRate } from "../reducers/beforeIcoState";
import { selectStartDate } from "../reducers/commitmentState";

interface IBeforeIco {
  startDate: moment.Moment;
  neumarkInitialRate?: any;
  loadIcoParameters: () => {};
  loadBeforeIcoDetails: () => {};
}

class BeforeIco extends React.Component<IBeforeIco> {
  public componentDidMount() {
    this.props.loadBeforeIcoDetails();
  }

  public render() {
    const { startDate, loadIcoParameters, neumarkInitialRate } = this.props;

    return (
      <div>
        <Incentive
          startDate={startDate}
          onFinish={loadIcoParameters}
          neumarkInitialRate={neumarkInitialRate}
        />
      </div>
    );
  }
}

export function mapStateToProps(state: IAppState) {
  return {
    startDate: selectStartDate(state.commitmentState),
    neumarkInitialRate: selectNeumarkInitialRate(state.beforeIcoState),
  };
}

function mapDispatchToProps(dispatch: Dispatch<IAppState>) {
  return {
    loadIcoParameters: () => dispatch(loadIcoParams),
    loadBeforeIcoDetails: () => dispatch(loadBeforeIcoDetails),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BeforeIco as any);
