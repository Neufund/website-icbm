import * as moment from "moment";
import * as React from "react";
import * as zeroFill from "zero-fill";
import * as styles from "./Countdown.scss";

const numberFormatter = zeroFill(2);

const SECOND = 1000;

interface ICountdownComponentProps {
  duration: moment.Duration;
}

export const CountdownComponent = ({ duration }: ICountdownComponentProps) =>
  <div className={styles.countdown}>
    <strong className={styles.label}>d</strong>
    <span className={styles.value} data-test-id="countdown-days">
      {numberFormatter(Math.floor(duration.asDays()))}
    </span>
    <strong className={styles.label}>h</strong>
    <span className={styles.value} data-test-id="countdown-hours">
      {numberFormatter(duration.hours())}
    </span>
    <strong className={styles.label}>m</strong>
    <span className={styles.value} data-test-id="countdown-minutes">
      {numberFormatter(duration.minutes())}
    </span>
    <strong className={styles.label}>s</strong>
    <span className={styles.value} data-test-id="countdown-seconds">
      {numberFormatter(duration.seconds())}
    </span>
  </div>;

interface ICountdownProps {
  finishDate: moment.Moment;
  onFinish?: () => {};
}

interface ICountdownState {
  duration: moment.Duration;
  callbackCalled: boolean;
  timerID: number;
}

export class Countdown extends React.Component<ICountdownProps, ICountdownState> {
  constructor(props: ICountdownProps) {
    super(props);

    const duration = this.calculateDuration();
    this.state = {
      duration,
      timerID: null,
      callbackCalled: this.callCallbackWhenNeeded(duration),
    };
  }

  public componentDidMount() {
    const timerID = window.setInterval(() => {
      const duration = this.calculateDuration();
      this.setState({
        ...this.state,
        duration,
        callbackCalled: this.state.callbackCalled || this.callCallbackWhenNeeded(duration),
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

  public render() {
    const { duration } = this.state;

    return <CountdownComponent duration={duration} />;
  }

  private calculateDuration() {
    const finishDate = this.props.finishDate;
    const now = moment();
    const duration = moment.duration(finishDate.diff(now));

    // do not display negative dates
    if (duration.asSeconds() < 0) {
      return moment.duration(0);
    }

    return duration;
  }

  private callCallbackWhenNeeded(duration: moment.Duration): boolean {
    if (duration.asSeconds() === 0) {
      if (this.props.onFinish) {
        this.props.onFinish();
      }

      return true;
    }
    return false;
  }
}
