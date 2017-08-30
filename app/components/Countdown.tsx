import * as moment from "moment";
import * as React from "react";
import * as zeroFill from "zero-fill";
import "./Countdown.scss";

const numberFormatter = zeroFill(2);

const SECOND = 1000;

interface ICountdownComponentProps {
  duration: moment.Duration;
}

// @todo remove moment prop checkers
export const CountdownComponent = ({ duration }: ICountdownComponentProps) =>
  <div>
    <span className="countdown-label">d</span>
    <span className="countdown-value">
      {numberFormatter(duration.days())}
    </span>
    <span className="countdown-label">h</span>
    <span className="countdown-value">
      {numberFormatter(duration.hours())}
    </span>
    <span className="countdown-label">m</span>
    <span className="countdown-value">
      {numberFormatter(duration.minutes())}
    </span>
    <span className="countdown-label">s</span>
    <span className="countdown-value">
      {numberFormatter(duration.seconds())}
    </span>
  </div>;

interface ICountdownProps {
  finishDate: moment.Moment;
}

interface ICountdownState {
  duration: moment.Duration;
  timerID: number;
}

export class Countdown extends React.Component<ICountdownProps, ICountdownState> {
  constructor(props: ICountdownProps) {
    super(props);

    this.state = {
      duration: this.calculateDuration(),
      timerID: null,
    };
  }

  public componentDidMount() {
    const timerID = window.setInterval(() => {
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

  public componentWillUnmount() {
    clearInterval(this.state.timerID);
  }

  public calculateDuration() {
    const finishDate = this.props.finishDate;
    const now = moment();

    return moment.duration(finishDate.diff(now));
  }

  public render() {
    const { duration } = this.state;

    return <CountdownComponent duration={duration} />;
  }
}
