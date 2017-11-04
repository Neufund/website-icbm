import * as React from "react";
import { Modal } from "react-bootstrap";
import { connect, MapDispatchToPropsParam } from "react-redux";
import { initLedgerConnection } from "../../actions/walletSelectorActions";
import { LoadingIndicator } from "../LoadingIndicator";

interface ILedgerInitProps {
  initLedgerConnection: () => any;
}

export class LedgerInit extends React.Component<ILedgerInitProps> {
  public async componentDidMount() {
    this.props.initLedgerConnection();
  }

  public render() {
    return (
      <div>
        <Modal.Header>
          <Modal.Title>Ledger Wallet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Plug in your Nano Ledger S.</p>
          <ol>
            <li>Unlock it</li>
            <li>Open Ethereum app</li>
            <li>Make sure it's configured correctly:</li>
            <ul>
              <li>Settings -> Contract data -> Yes</li>
              <li>Settings -> Browser suport -> Yes</li>
            </ul>
          </ol>
          <LoadingIndicator />
        </Modal.Body>
        <Modal.Footer />
      </div>
    );
  }
}

const mapDispatchToProps: MapDispatchToPropsParam<ILedgerInitProps, {}> = dispatcher => ({
  initLedgerConnection: () => dispatcher(initLedgerConnection),
});
export default connect<{}, ILedgerInitProps, {}>(null, mapDispatchToProps)(LedgerInit);
