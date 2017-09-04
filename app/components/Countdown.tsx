import * as moment from "moment";
import * as React from "react";
import * as zeroFill from "zero-fill";
import * as styles from "./Countdown.scss";

const numberFormatter = zeroFill(2);

const SECOND = 1000;

interface ICountdownComponentProps {
  duration: moment.Duration;
}

export const CountdownComponent = ({ duration }: ICountdownComponentProps) => (
  <div>
    <strong className={styles.label}>d</strong>
    <span className={styles.value}>{numberFormatter(duration.days())}</span>
    <strong className={styles.label}>h</strong>
    <span className={styles.value}>{numberFormatter(duration.hours())}</span>
    <strong className={styles.label}>m</strong>
    <span className={styles.value}>{numberFormatter(duration.minutes())}</span>
    <strong className={styles.label}>s</strong>
    <span className={styles.value}>{numberFormatter(duration.seconds())}</span>
  </div>
);

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
