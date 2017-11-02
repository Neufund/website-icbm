import * as React from "react";

import * as styles from "./ErrorComponent.scss";

interface IErrorInterface {
  error: string;
}

export const ErrorComponent: React.SFC<IErrorInterface> = ({ error }) =>
  <div className={styles.error}>
    <h2>Ups we have a problem :(</h2>
    {error}
  </div>;
