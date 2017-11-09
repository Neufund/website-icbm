import * as React from "react";
import { connect } from "react-redux";

import { IAppState } from "../../reducers/index";
import { selectIsLedgerSelected } from "../../reducers/web3State";
import { CommitKnownUser } from "../commitfunds/CommitKnownUser";
import { LedgerAddressChooser } from "./LedgerAddressChooser";
import { LedgerInit } from "./LedgerInit";

interface ILedgerWalletComponentProps {
  isInitialized: boolean;
  isConnected: boolean;
}

export class LedgerWalletComponent extends React.Component<ILedgerWalletComponentProps> {
  public render() {
    const { isInitialized, isConnected } = this.props;
    if (!isConnected) {
      return <LedgerInit />;
    }
    if (!isInitialized) {
      return <LedgerAddressChooser />;
    } else {
      return <CommitKnownUser />;
    }
  }
}

export const LedgerWallet = connect((state: IAppState) => ({
  isInitialized: selectIsLedgerSelected(state.web3State),
  isConnected: state.walletSelectorState.ledgerWalletConnected,
}))(LedgerWalletComponent);
