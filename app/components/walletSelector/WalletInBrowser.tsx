import * as React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { walletInBrowserWatchNewAccounts } from "../../actions/walletSelectorActions";
import { IAppState } from "../../reducers/index";
import { selectEthBrowserWalletSelected } from "../../reducers/web3State";
import { CommitKnownUser } from "../commitfunds/CommitKnownUser";
import { watchAction } from "../WatchActionHoc";
import { EthBrowserWalletInit } from "./EthBrowserWalletInit";

interface IWalletInBrowserComponentProps {
  isInitialized: boolean;
}

const CommitKnownUserAndWatchAccounts = compose(
  connect(null, dispatch => ({
    watchNewAccounts: () => dispatch(walletInBrowserWatchNewAccounts),
  })),
  watchAction({ actionName: "watchNewAccounts" })
)(CommitKnownUser as any);

export const WalletInBrowserComponent: React.SFC<IWalletInBrowserComponentProps> = ({
  isInitialized,
}) => (isInitialized ? <CommitKnownUserAndWatchAccounts /> : <EthBrowserWalletInit />);

export const WalletInBrowser = connect((state: IAppState) => ({
  isInitialized: selectEthBrowserWalletSelected(state.web3State),
}))(WalletInBrowserComponent);
