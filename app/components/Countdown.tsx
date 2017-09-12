import * as cn from "classnames";
import * as moment from "moment";
import * as React from "react";
import * as zeroFill from "zero-fill";
import * as styles from "./Countdown.scss";

const numberFormatter = zeroFill(2);

const SECOND = 1000;

interface ICountdownClassNamesProps {
  root?: string;
  label?: string;
  value?: string;
}

interface ICountdownComponentProps {
  duration: moment.Duration;
  classNames?: ICountdownClassNamesProps;
}

export const CountdownComponent = ({ duration, classNames = {} }: ICountdownComponentProps) => {
  const labelClassNames = cn(styles.label, classNames.label);
  const valueClassNames = cn(styles.value, classNames.value);

  return (
    <span className={cn(styles.countdown, classNames.root)}>
      <strong className={labelClassNames}>d</strong>
      <span className={valueClassNames}>
        {numberFormatter(Math.floor(duration.asDays()))}
      </span>
      <strong className={labelClassNames}>h</strong>
      <span className={valueClassNames}>
        {numberFormatter(duration.hours())}
      </span>
      <strong className={labelClassNames}>m</strong>
      <span className={valueClassNames}>
        {numberFormatter(duration.minutes())}
      </span>
      <strong className={labelClassNames}>s</strong>
      <span className={valueClassNames}>
        {numberFormatter(duration.seconds())}
      </span>
    </span>
  );
};

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
