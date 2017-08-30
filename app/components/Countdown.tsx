import * as React from "react";
import * as styles from "./Countdown.scss";

interface Icount {
  time: number;
}
export const Count: React.SFC<Icount> = props =>
  <p className={styles.countdown}>
    {props.time}5
  </p>;

export default Count;
