import * as cn from "classnames";
import * as React from "react";
import { connect } from "react-redux";

import { Web3Type } from "../../actions/constants";
import {
  initEthBrowserSelectionAction,
  initLedgerSelectionAction,
} from "../../actions/walletSelectorActions";
import { setWeb3Action } from "../../actions/web3";
import { IAppState } from "../../reducers/index";
import {
  selectEthBrowserWalletSelected,
  selectIsLedgerSelected,
  selectNoWalletSelected,
} from "../../reducers/web3State";
import { HiResImage } from "../HiResImage";
import * as styles from "./WalletSelector.scss";

interface IWalletSelectorProps {
  initEthBrowser: () => any;
  initLedgerSelection: () => any;
  selectNoWallet: () => any;
  isEthBrowserSelected: boolean;
  isLedgerSelected: boolean;
  isNoWalletSelected: boolean;
}

export const WalletSelector: React.SFC<IWalletSelectorProps> = ({
  isEthBrowserSelected,
  isLedgerSelected,
  isNoWalletSelected,
  initEthBrowser,
  initLedgerSelection,
  selectNoWallet,
}) => {
  return (
    <div className={styles.walletSelector}>
      <WalletTab active={isEthBrowserSelected} onSelect={initEthBrowser}>
        <HiResImage partialPath="wallet_selector/icon_wallet" className={styles.walletIcon} />Wallet
        in Browser
      </WalletTab>
      <WalletTab active={isLedgerSelected} onSelect={initLedgerSelection}>
        <HiResImage partialPath="wallet_selector/icon_ledger" className={styles.walletIcon} />Ledger
        Wallet
      </WalletTab>
      <WalletTab active={isNoWalletSelected} onSelect={selectNoWallet}>
        <HiResImage
          partialPath="wallet_selector/icon_other_wallet"
          className={styles.walletIcon}
        />Other Wallet
      </WalletTab>
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
    isEthBrowserSelected: selectEthBrowserWalletSelected(state.web3State),
    isLedgerSelected: selectIsLedgerSelected(state.web3State),
    isNoWalletSelected: selectNoWalletSelected(state.web3State),
  }),
  dispatch => ({
    initEthBrowser: () => dispatch(initEthBrowserSelectionAction()),
    initLedgerSelection: () => dispatch(initLedgerSelectionAction()),
    selectNoWallet: () => dispatch(setWeb3Action(Web3Type.UNKNOWN)),
  })
)(WalletSelector);
