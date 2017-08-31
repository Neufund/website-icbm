import * as moment from "moment";
import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { loadIcoStats } from "../actions/loadIcoState";
import { DuringIco as DuringIcoComponent } from "../components/DuringIco";
import { selectEndDate, selectIcoPhase } from "../reducers/icoParameters";

interface IDuringIcoProps {
  loadIcoStats: any;
  minCap: number;
  maxCap: number;
  finishDate: moment.Moment;
  icoState: any;
}
const SECOND: number = 1000;
export class DuringIco extends React.Component<IDuringIcoProps> {
  public componentDidMount() {
    const timerID = window.setInterval(() => {
      this.props.loadIcoStats();
      this.setState({
        ...this.state,
        duration: this.calculateDuration(),
      });
    }, SECOND);

    this.setState({
      ...this.state,
      timerID,
    });
  }

  public calculateDuration() {
    const { finishDate } = this.props;
    const now = moment();
    return moment.duration(finishDate.diff(now));
  }

  public render() {
    const { icoState, finishDate } = this.props;

    // @todo: implement loading component
    if (icoState.loading) {
      return <div>Loading ...</div>;
    }

    return (
      <DuringIcoComponent
        raised={icoState.raised}
        neuMarkAmount={icoState.neuMarkAmount}
        neuMarkToEtherRatio={icoState.neuMarkToEtherRatio}
        finishDate={this.calculateDuration()}
      />
    );
  }
}

function mapStateToProps(state: any) {
  return {
    icoState: state.icoState,
    minCap: state.icoParameters.minCap,
    maxCap: state.icoParameters.maxCap,
    finishDate: selectEndDate(state.icoParameters),
  };
}

function mapDispatchToProps(dispatch: Dispatch<any>) {
  return {
    loadIcoStats: () => dispatch(loadIcoStats),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DuringIco);
