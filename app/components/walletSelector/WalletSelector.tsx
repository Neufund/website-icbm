import * as cn from "classnames";
import * as React from "react";
import { Button } from "react-bootstrap";
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
import WalletIntegrationModal from "./WalletIntegrationModal";
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
  initLedgerSelection,
  isEthBrowserSelected,
  isLedgerSelected,
  isNoWalletSelected,
  selectNoWallet,
  initEthBrowser,
}) => {
  return (
    <div className={styles.walletSelector}>
      <WalletIntegrationModal />
      <h3>Select your wallet</h3>
      <Button
        className={cn("btn-white", { [styles.selected]: isEthBrowserSelected })}
        onClick={initEthBrowser}
      >
        MetaMask/Parity/Mist
      </Button>
      <Button
        className={cn("btn-white", { [styles.selected]: isLedgerSelected })}
        onClick={initLedgerSelection}
      >
        Ledger Wallet
      </Button>
      <Button
        className={cn("btn-white", { [styles.selected]: isNoWalletSelected })}
        onClick={selectNoWallet}
      >
        No wallet
      </Button>
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
