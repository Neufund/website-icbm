import * as React from "react";
import { connect } from "react-redux";
import { compose } from "redux";

import { initWalletInBrowser } from "../../actions/walletSelectorActions";
import { IAppState } from "../../reducers/index";
import { LoadingIndicator } from "../LoadingIndicator";
import { watchAction } from "../WatchActionHoc";

import { Alert, Col, Row } from "react-bootstrap";
import { HiResImage } from "../HiResImage";
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

    <p>Currently we support following wallets:</p>

    <Row className="center">
      <Col sm={4}>
        <HiResImage partialPath="wallet_selector/logo_metamask" />
      </Col>
      <Col sm={4}>
        <HiResImage partialPath="wallet_selector/logo_parity" />
      </Col>
      <Col sm={4}>
        <HiResImage partialPath="wallet_selector/logo_mist" />
      </Col>
    </Row>

    <p>Follow these steps:</p>

    <div className={styles.steps}>
      <ol>
        <li>Turn on browser plugin.</li>
        <li>Refresh.</li>
        <li>Unlock wallet</li>
      </ol>
    </div>
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
