import * as React from "react";
import { connect } from "react-redux";
import { compose } from "redux";

import { initLedgerConnection } from "../../actions/walletSelectorActions";
import { IAppState } from "../../reducers/index";
import { HiResImage } from "../HiResImage";
import { LoadingIndicator } from "../LoadingIndicator";
import { watchAction } from "../WatchActionHoc";

import { Alert } from "react-bootstrap";
import * as styles from "./LedgerInit.scss";

interface ILedgerInitProps {
  initLedgerConnection: () => any;
  errorMessage: string;
}

export const LedgerInitComponent: React.SFC<ILedgerInitProps> = ({ errorMessage }) =>
  <div className={styles.ledgerInit}>
    <p>Plug in your Nano Ledger S and follow these steps:</p>
    <p>Unlock your Nano Ledger S.</p>
    <div className={styles.imageWrapper}>
      <HiResImage partialPath="wallet_selector/ledger_unlock" className="img-responsive" />
    </div>
    <p>Open Ethereum application.</p>
    <div className={styles.imageWrapper}>
      <HiResImage partialPath="wallet_selector/ledger_ethereum" className="img-responsive" />
    </div>

    <p>
      Go to settings and set:
      <ul>
        <li>
          Contract Data: <strong>Yes</strong>
        </li>
        <li>
          Browser Support: <strong>Yes</strong>
        </li>
      </ul>
    </p>
    {errorMessage &&
      <Alert bsStyle="danger">
        <h4>Error occured!</h4>
        <p>
          {errorMessage}
        </p>
      </Alert>}
    <LoadingIndicator />
  </div>;

export const LedgerInit = compose(
  connect(
    (state: IAppState) => ({
      errorMessage: state.walletSelectorState.ledgerWalletError,
    }),
    dispatcher => ({
      initLedgerConnection: () => dispatcher(initLedgerConnection),
    })
  ),
  watchAction({ actionName: "initLedgerConnection", interval: 2000 })
)(LedgerInitComponent);
