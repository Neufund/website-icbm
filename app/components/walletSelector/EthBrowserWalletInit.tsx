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
    <p>Please select your wallet.</p>

    <p>Currently we support the following wallets:</p>

    <Row className="center">
      <Col sm={4}>
        <HiResImage partialPath="wallet_selector/logo_metamask" altText="Metamask" />
      </Col>
      <Col sm={4}>
        <HiResImage partialPath="wallet_selector/logo_parity" altText="Parity" />
      </Col>
      <Col sm={4}>
        <HiResImage partialPath="wallet_selector/logo_mist" altText="Mist" />
      </Col>
    </Row>

    <p>Follow these steps:</p>

    <div className={styles.steps}>
      <ol>
        <li>Turn on your browser plugin.</li>
        <li>Refresh the page.</li>
        <li>Unlock your wallet.</li>
      </ol>
    </div>
    {errorMessage &&
      <Alert bsStyle="info">
        <h4>Error has occured!</h4>
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
