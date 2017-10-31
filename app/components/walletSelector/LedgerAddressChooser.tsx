import * as React from "react";

import { Button, Modal } from "react-bootstrap";
import { connect, Dispatch } from "react-redux";
import {
  ledgerGetAddresses,
  showNextAddresses,
  showPrevAddresses,
} from "../../actions/ledgerAddressChooser";
import { IAppState } from "../../reducers/index";
import { ILedgerAccount, selectHasPrevious } from "../../reducers/ledgerAddressChooserState";
import { LoadingIndicator } from "../LoadingIndicator";
import { LedgerAddressChooserComponent } from "./LedgerAddressChooserComponent";

const NUMBER_OF_ADDRESSES_PER_PAGE = 5;

interface ILedgerAddressChooser {
  // handleAddressChosen: (derivationPath: string, address: string) => void;
  loading: boolean;
  hasPrevious: boolean;
  derivationPath: string;
  accounts: ILedgerAccount[];
  ledgerGetAddresses: () => any;
  handleAddressChosen: (account: ILedgerAccount) => () => void;
  handleDerivationPathChange: (event: object, newValue: string) => void;
  showNextAddresses: () => any;
  showPrevAddresses: () => any;
}

// interface IAddressChooserModalContainerState {
//   derivationPath: string;
//   startingIndex: number;
//   addresses: IDerivationPaths;
//   loading: boolean;
// }

export class LedgerAddressChooser extends React.Component<ILedgerAddressChooser> {
  public componentDidMount() {
    this.props.ledgerGetAddresses();
  }

  public render() {
    return (
      <div>
        <Modal.Header>
          <Modal.Title>Choose your address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.renderBody()}
        </Modal.Body>
        <Modal.Footer>
          <Button
            bsStyle="primary"
            disabled={!this.props.hasPrevious || this.props.loading}
            onClick={this.props.showPrevAddresses}
          >
            show previous addresses
          </Button>
          <Button
            bsStyle="primary"
            disabled={this.props.loading}
            onClick={this.props.showNextAddresses}
          >
            show next addresses
          </Button>
        </Modal.Footer>
      </div>
    );
  }

  public renderBody() {
    if (this.props.loading) {
      return <LoadingIndicator />;
    }

    return (
      <LedgerAddressChooserComponent
        derivationPath={this.props.derivationPath}
        accounts={this.props.accounts}
        handleAddressChosen={(() => {}) as any}
        handleDerivationPathChange={(() => {}) as any}
      />
    );
  }
}

const stateToProps = (state: IAppState) => ({
  loading: state.ledgerAddressChooserState.loading,
  hasPrevious: selectHasPrevious(state.ledgerAddressChooserState),
  derivationPath: state.ledgerAddressChooserState.derivationPath,
  accounts: state.ledgerAddressChooserState.accounts,
});

const dispatchToProps = (dispatcher: Dispatch<any>) => ({
  ledgerGetAddresses: () => dispatcher(ledgerGetAddresses),
  showNextAddresses: () => dispatcher(showNextAddresses),
  showPrevAddresses: () => dispatcher(showPrevAddresses),
});

export default connect(stateToProps, dispatchToProps)(LedgerAddressChooser);
