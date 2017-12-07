import * as React from "react";
import { Alert } from "react-bootstrap";

import * as kitty from "../assets/img/kitty.svg";
import * as styles from "./CryptoKittiesNote.scss";

export const CryptoKittiesNote: React.SFC<{}> = () =>
  <Alert bsStyle="info" className={styles.container}>
    <strong>UPDATE:</strong> Due to Cryptokitties taking on the world, the Ethereum network is
    overloaded. This results in huge transaction delays. Please use the gas price suggested in the
    commitment process.
    <img className={styles.kitty} src={kitty} />
  </Alert>;
