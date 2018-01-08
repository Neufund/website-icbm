import * as cn from "classnames";
import * as React from "react";
import { connect } from "react-redux";

import { IcoPhase } from "../../actions/constants";
import {
  ledgerWalletSelectedAction,
  otherWalletSelectedAction,
  walletInBrowserSelectedAction,
} from "../../actions/walletSelectorActions";
import { IAppState } from "../../reducers/index";
import { CommitHeaderComponent } from "../commitfunds/CommitHeaderComponent";
import { CommitUnknownUser } from "../commitfunds/CommitUnknownUser";
import { HiResImage } from "../HiResImage";
import { LegalModal } from "../LegalModal";
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
  commitmentState: IcoPhase;
}

export class WalletSelectorComponent extends React.Component<IWalletSelectorProps> {
  public componentWillMount() {
    // if committing money should not be allowed redirect to home
    if (this.props.commitmentState !== IcoPhase.DURING) {
      window.location.replace("/");
    }
  }

  public render() {
    const {
      walletInBrowserSelected,
      ledgerWalletSelected,
      otherWalletSelected,
      walletInBrowserSelectedAction,
      ledgerWalletSelectedAction,
      otherWalletSelectedAction,
    } = this.props;

    return (
      <div>
        <LegalModal />
        <CommitHeaderComponent number="01" title="Commit your funds" />
        <p>Please select your wallet.</p>
        <div>
          <div className={styles.walletSelector}>
            <WalletTab
              active={otherWalletSelected}
              onSelect={otherWalletSelectedAction}
              data-test-id="wallet-selector-other"
            >
              <HiResImage
                partialPath="wallet_selector/icon_other_wallet"
                className={styles.walletIcon}
              />External Wallet
            </WalletTab>
            <WalletTab
              active={walletInBrowserSelected}
              onSelect={walletInBrowserSelectedAction}
              data-test-id="wallet-selector-browser"
            >
              <HiResImage
                partialPath="wallet_selector/icon_wallet"
                className={styles.walletIcon}
              />Wallet in your browser
            </WalletTab>
            <WalletTab
              active={ledgerWalletSelected}
              onSelect={ledgerWalletSelectedAction}
              data-test-id="wallet-selector-ledger"
            >
              <HiResImage
                partialPath="wallet_selector/icon_ledger"
                className={styles.walletIcon}
              />Ledger Nano Wallet
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
  }
}

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
    commitmentState: state.commitmentState.commitmentState,
  }),
  dispatch => ({
    walletInBrowserSelectedAction: () => dispatch(walletInBrowserSelectedAction()),
    ledgerWalletSelectedAction: () => dispatch(ledgerWalletSelectedAction()),
    otherWalletSelectedAction: () => dispatch(otherWalletSelectedAction()),
  })
)(WalletSelectorComponent);
