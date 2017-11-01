import * as React from "react";

import { debounce } from "lodash";
import { TextField } from "material-ui";
import { Button, Modal } from "react-bootstrap";
import { connect, Dispatch } from "react-redux";
import {
  changeDerivationPath,
  chooseAccount,
  ledgerGetAddresses,
  showNextAddresses,
  showPrevAddresses,
} from "../../actions/ledgerAddressChooser";
import { IAppState } from "../../reducers/index";
import { ILedgerAccount, selectHasPrevious } from "../../reducers/ledgerAddressChooserState";
import { LoadingIndicator } from "../LoadingIndicator";
import { LedgerAddressChooserTable } from "./LedgerAddressChooserTable";

interface ILedgerAddressChooserProps {
  // handleAddressChosen: (derivationPath: string, address: string) => void;
  loading: boolean;
  hasPrevious: boolean;
  derivationPath: string;
  accounts: ILedgerAccount[];
  ledgerGetAddresses: () => any;
  showNextAddresses: () => any;
  showPrevAddresses: () => any;
  changeDerivationPath: (dp: string) => any;
  chooseAccount: (account: ILedgerAccount) => () => any;
}

interface IAddressChooserModalState {
  derivationPath: string;
}

export class LedgerAddressChooser extends React.Component<
  ILedgerAddressChooserProps,
  IAddressChooserModalState
> {
  constructor(props: ILedgerAddressChooserProps) {
    super(props);

    this.state = {
      derivationPath: props.derivationPath,
    };
  }

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
          <div>
            <TextField
              name="derivationPathField"
              value={this.state.derivationPath}
              onChange={this.derivationPathChanged}
            />
            - provide your derivation path
          </div>
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

  private derivationPathChanged = (_event: object, newDerivationPath: string) => {
    this.setState({
      derivationPath: newDerivationPath,
    });
    this.props.changeDerivationPath(newDerivationPath);
  };

  private renderBody() {
    if (this.props.loading) {
      return <LoadingIndicator />;
    }

    return (
      <LedgerAddressChooserTable
        accounts={this.props.accounts}
        handleAddressChosen={this.props.chooseAccount}
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
  changeDerivationPath: (debounce as any)(
    (dp: string) => dispatcher(changeDerivationPath(dp)),
    300
  ) as (dp: string) => any,
  chooseAccount: (account: ILedgerAccount) => dispatcher(chooseAccount(account)),
});

export default connect(stateToProps, dispatchToProps)(LedgerAddressChooser);
