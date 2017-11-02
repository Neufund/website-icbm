import { delay } from "bluebird";
import * as React from "react";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";

import { finishSelectionAction } from "../../actions/walletSelectorActions";
import { Web3Service } from "../../web3/web3Service";
import { LoadingIndicator } from "../LoadingIndicator";

const RETRY_NO = 10;

interface IEthBrowserWalletInitProps {
  finishSelectionAction: () => any;
}

export class EthBrowserWalletInit extends React.Component<IEthBrowserWalletInitProps> {
  public async componentDidMount() {
    let retry = RETRY_NO;
    // tslint:disable-next-line
    while (retry-- > 0) {
      try {
        await Web3Service.instance.injectWeb3();
        await this.props.finishSelectionAction();
      } catch (e) {
        await delay(1000);
      }
    }
  }

  public render() {
    return (
      <div>
        <Modal.Header>
          <Modal.Title>Etherum Wallet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <p>Connect to your ethereum wallet.</p>
            <ol>
              <li>Turn on browser plugin.</li>
              <li>Unlock wallet</li>
            </ol>
            <LoadingIndicator />
          </div>
        </Modal.Body>
        <Modal.Footer />
      </div>
    );
  }
}

export default connect(null, dispatch => ({
  finishSelectionAction: () => dispatch(finishSelectionAction()),
}))(EthBrowserWalletInit);
