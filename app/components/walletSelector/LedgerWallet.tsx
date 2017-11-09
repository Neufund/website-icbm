import * as React from "react";
import { connect } from "react-redux";

import { LedgerService } from "../../ledgerService";
import { IAppState } from "../../reducers/index";
import { selectIsLedgerSelected } from "../../reducers/web3State";
import { Web3Service } from "../../web3/web3Service";
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

  public componentWillUnmount() {
    Web3Service.instance.personalWeb3 = null;
    LedgerService.deinit();
  }
}

export const LedgerWallet = connect((state: IAppState) => ({
  isInitialized: selectIsLedgerSelected(state.web3State),
  isConnected: state.walletSelectorState.ledgerWalletConnected,
}))(LedgerWalletComponent);
