import { noop } from "lodash";
import * as React from "react";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";

import { IAppState } from "../../reducers/index";
import { selectShouldDisplayIntegrationModal } from "../../reducers/walletIntegrationState";
import EthBrowserWalletInit from "./EthBrowserWalletInit";
import LedgerAddressChooser from "./LedgerAddressChooser";
import LedgerInit from "./LedgerInit";

interface IWalletIntegrationProps {
  show: boolean;
  ledgerIntegrationConnected: boolean;
  ethBrowserInProgress: boolean;
  ledgerInProgress: boolean;
}

export class WalletIntegrationModal extends React.Component<IWalletIntegrationProps> {
  public render() {
    return (
      <Modal bsSize="large" show={this.props.show} onHide={noop}>
        {this.props.show && this.renderStep()}
      </Modal>
    );
  }

  private renderStep() {
    if (this.props.ledgerInProgress) {
      if (this.props.ledgerIntegrationConnected) {
        return <LedgerAddressChooser />;
      } else {
        return <LedgerInit />;
      }
    }

    if (this.props.ethBrowserInProgress) {
      return <EthBrowserWalletInit />;
    }
  }
}

const mapStateToProps = (state: IAppState) => ({
  show: selectShouldDisplayIntegrationModal(state.walletIntegrationState),
  ledgerInProgress: state.walletIntegrationState.ledgerIntegrationInProgress,
  ledgerIntegrationConnected: state.walletIntegrationState.ledgerIntegrationConnected,
  ethBrowserInProgress: state.walletIntegrationState.ethBrowserInProgress,
});

export default connect<IWalletIntegrationProps, {}, {}>(mapStateToProps)(WalletIntegrationModal);
