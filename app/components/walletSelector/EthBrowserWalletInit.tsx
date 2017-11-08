import * as React from "react";
import { connect } from "react-redux";
import { compose } from "redux";

import { initWalletInBrowser } from "../../actions/walletSelectorActions";
import { IAppState } from "../../reducers/index";
import { LoadingIndicator } from "../LoadingIndicator";
import { watchAction } from "../WatchActionHoc";

import { Alert } from "react-bootstrap";
import * as styles from "./EthBrowserWalletInit.scss";

interface IEthBrowserWalletInitProps {
  initWalletInBrowser: () => any;
  errorMessage?: string;
}

export const EthBrowserWalletInitComponent: React.SFC<IEthBrowserWalletInitProps> = ({
  errorMessage,
}) =>
  <div>
    <p>Connect to your ethereum wallet.</p>
    <ol>
      <li>Turn on browser plugin.</li>
      <li>Refresh.</li>
      <li>Unlock wallet</li>
    </ol>
    {errorMessage &&
      <Alert bsStyle="danger">
        <h4>Error occured!</h4>
        <p>
          {errorMessage}
        </p>
      </Alert>}

    <LoadingIndicator />
  </div>;

export const EthBrowserWalletInit = compose(
  connect(
    (state: IAppState) => ({
      errorMessage: state.walletSelectorState.walletInBrowserError,
    }),
    dispatch => ({
      initWalletInBrowser: () => dispatch(initWalletInBrowser),
    })
  ),
  watchAction({ actionName: "initWalletInBrowser", runOnMount: true })
)(EthBrowserWalletInitComponent);
