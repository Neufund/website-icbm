import * as React from "react";

import * as styles from "./ErrorComponent.scss";

interface IFatalErrorInterface {
  fatalError: string;
}

export const FatalErrorComponent: React.SFC<IFatalErrorInterface> = ({ fatalError }) =>
  <div className={styles.error}>
    <h2>Ups we have a problem :(</h2>
    {fatalError}
  </div>;
