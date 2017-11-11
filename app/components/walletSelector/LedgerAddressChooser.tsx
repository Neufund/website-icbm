import * as React from "react";

import { debounce } from "lodash";
import { TextField } from "material-ui";
import { connect, Dispatch } from "react-redux";
import {
  changeDerivationPath,
  chooseAccount,
  ledgerGetAddresses,
  showNextAddresses,
  showPrevAddresses,
} from "../../actions/ledgerAddressChooserActions";
import { IAppState } from "../../reducers/index";
import { ILedgerAccount, selectHasPrevious } from "../../reducers/ledgerAddressChooserState";
import { LoadingIndicator } from "../LoadingIndicator";
import { LedgerAddressChooserTable } from "./LedgerAddressChooserTable";

interface ILedgerAddressChooserProps {
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

export class LedgerAddressChooserComponent extends React.Component<
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
        <div>
          <TextField
            name="derivationPathField"
            value={this.state.derivationPath}
            onChange={this.derivationPathChanged}
          />
          - provide your derivation path
        </div>
        {this.renderBody()}
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
        hasPrevious={this.props.hasPrevious}
        loading={this.props.loading}
        showPrevAddresses={this.props.showPrevAddresses}
        showNextAddresses={this.props.showNextAddresses}
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

export const LedgerAddressChooser = connect(stateToProps, dispatchToProps)(
  LedgerAddressChooserComponent
);
