import * as cn from "classnames";
import * as React from "react";
import { connect } from "react-redux";

import {
  ledgerWalletSelectedAction,
  otherWalletSelectedAction,
  walletInBrowserSelectedAction,
} from "../../actions/walletSelectorActions";
import { IAppState } from "../../reducers/index";
import { HiResImage } from "../HiResImage";
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

export const WalletSelector: React.SFC<IWalletSelectorProps> = ({
  walletInBrowserSelected,
  ledgerWalletSelected,
  otherWalletSelected,
  walletInBrowserSelectedAction,
  ledgerWalletSelectedAction,
  otherWalletSelectedAction,
}) => {
  return (
    <div>
      <div className={styles.walletSelector}>
        <WalletTab active={walletInBrowserSelected} onSelect={walletInBrowserSelectedAction}>
          <HiResImage
            partialPath="wallet_selector/icon_wallet"
            className={styles.walletIcon}
          />Wallet in Browser
        </WalletTab>
        <WalletTab active={ledgerWalletSelected} onSelect={ledgerWalletSelectedAction}>
          <HiResImage
            partialPath="wallet_selector/icon_ledger"
            className={styles.walletIcon}
          />Ledger Wallet
        </WalletTab>
        <WalletTab active={otherWalletSelected} onSelect={otherWalletSelectedAction}>
          <HiResImage
            partialPath="wallet_selector/icon_other_wallet"
            className={styles.walletIcon}
          />Other Wallet
        </WalletTab>
      </div>
      <div>
        {walletInBrowserSelected && <WalletInBrowser />}
      </div>
    </div>
  );
};

interface IWalletTab {
  active?: boolean;
  onSelect: () => any;
}

const WalletTab: React.SFC<IWalletTab> = ({ active, onSelect, children }) => {
  return (
    <div className={cn(styles.walletTab, { active })} onClick={onSelect}>
      <div className={styles.walletTabTitle}>
        {children}
      </div>
    </div>
  );
};

export default connect(
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
)(WalletSelector);
