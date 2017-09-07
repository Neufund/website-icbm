import * as moment from "moment";
import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { loadIcoParams } from "../actions/loadIcoParams";
import { DuringIcoCountDown } from "../components/DuringIcoCountDown";
import { selectEndDate } from "../reducers/icoState";

interface IDuringIcoProps {
  loadIcoStats: any;
  finishDate: moment.Moment;
  icoState: any;
  loading: boolean;
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
      <DuringIcoCountDown
        raised={"10 000 000"}
        neuMarkAmount={"10 000"}
        neuMarkToEtherRatio={8.25}
        investorsAccountCreated={"20 000"}
        finishDate={this.calculateDuration()}
      />
    );
  }
}

function mapStateToProps(state: any) {
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
