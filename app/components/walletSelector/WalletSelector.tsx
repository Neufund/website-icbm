import * as cn from "classnames";
import * as React from "react";
import { connect } from "react-redux";

import {
  ledgerWalletSelectedAction,
  otherWalletSelectedAction,
  walletInBrowserSelectedAction,
} from "../../actions/walletSelectorActions";
import { IAppState } from "../../reducers/index";
import { CommitHeaderComponent } from "../commitfunds/CommitHeaderComponent";
import { CommitUnknownUser } from "../commitfunds/CommitUnknownUser";
import { HiResImage } from "../HiResImage";
import { LedgerWallet } from "./LedgerWallet";
import { WalletInBrowser } from "./WalletInBrowser";
import * as styles from "./WalletSelector.scss";

interface IWalletSelectorProps {
  walletInBrowserSelectedAction: () => any;
  ledgerWalletSelectedAction: () => any;
  otherWalletSelectedAction: () => any;
  walletInBrowserSelected: boolean;
  ledgerWalletSelected: boolean;
  otherWalletSelected: boolean;
}

export const WalletSelectorComponent: React.SFC<IWalletSelectorProps> = ({
  walletInBrowserSelected,
  ledgerWalletSelected,
  otherWalletSelected,
  walletInBrowserSelectedAction,
  ledgerWalletSelectedAction,
  otherWalletSelectedAction,
}) => {
  return (
    <div>
      <CommitHeaderComponent number="01" title="Commit funds" />
      <p>Please select source of your cryptocurrency.</p>
      <div>
        <div className={styles.walletSelector}>
          <WalletTab
            active={walletInBrowserSelected}
            onSelect={walletInBrowserSelectedAction}
            data-test-id="wallet-selector-browser"
          >
            <HiResImage
              partialPath="wallet_selector/icon_wallet"
              className={styles.walletIcon}
            />Wallet in Browser
          </WalletTab>
          <WalletTab
            active={ledgerWalletSelected}
            onSelect={ledgerWalletSelectedAction}
            data-test-id="wallet-selector-ledger"
          >
            <HiResImage
              partialPath="wallet_selector/icon_ledger"
              className={styles.walletIcon}
            />Ledger Wallet
          </WalletTab>
          <WalletTab
            active={otherWalletSelected}
            onSelect={otherWalletSelectedAction}
            data-test-id="wallet-selector-other"
          >
            <HiResImage
              partialPath="wallet_selector/icon_other_wallet"
              className={styles.walletIcon}
            />Other Wallet
          </WalletTab>
        </div>
        <div>
          {walletInBrowserSelected && <WalletInBrowser />}
          {ledgerWalletSelected && <LedgerWallet />}
          {otherWalletSelected && <CommitUnknownUser />}
        </div>
      </div>
    </div>
  );
};

interface IWalletTab {
  active?: boolean;
  onSelect: () => any;
}

const WalletTab: React.SFC<IWalletTab> = ({ active, onSelect, children, ...props }) => {
  return (
    <div className={cn(styles.walletTab, { active })} onClick={onSelect} {...props}>
      <div className={styles.walletTabTitle}>
        {children}
      </div>
    </div>
  );
};

export const WalletSelector = connect(
  (state: IAppState) => ({
    walletInBrowserSelected: state.walletSelectorState.walletInBrowserSelected,
    ledgerWalletSelected: state.walletSelectorState.ledgerWalletSelected,
    otherWalletSelected: state.walletSelectorState.otherWalletSelected,
  }),
  dispatch => ({
    walletInBrowserSelectedAction: () => dispatch(walletInBrowserSelectedAction()),
    ledgerWalletSelectedAction: () => dispatch(ledgerWalletSelectedAction()),
    otherWalletSelectedAction: () => dispatch(otherWalletSelectedAction()),
  })
)(WalletSelectorComponent);
