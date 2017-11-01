import { noop } from "lodash";
import * as React from "react";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { IAppState } from "../../reducers/index";
import LedgerAddressChooser from "./LedgerAddressChooser";
import LedgerInit from "./LedgerInit";

interface IWalletIntegrationProps {
  show: boolean;
  ledgerIntegrationConnected: boolean;
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
    if (this.props.ledgerIntegrationConnected) {
      return <LedgerAddressChooser />;
    } else {
      return <LedgerInit />;
    }
  }
}

const mapStateToProps = (state: IAppState) => ({
  show: state.walletIntegrationState.ledgerIntegrationInProgress,
  ledgerIntegrationConnected: state.walletIntegrationState.ledgerIntegrationConnected,
});

export default connect<IWalletIntegrationProps, {}, {}>(mapStateToProps)(WalletIntegrationModal);
