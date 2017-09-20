import * as React from "react";
import { Grid } from "react-bootstrap";
import * as styles from "./CommitNavbar.scss";

export const CommitNavbar: React.SFC = ({ children }) =>
  <div className={styles.headerContainer}>
    <Grid className={styles.header}>
      <a href="/" className={styles.logo} />
      <div className={styles.text}>
        {children}
      </div>
    </Grid>
  </div>;
