import * as React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { initLedgerConnection } from "../../actions/walletSelectorActions";
import { IAppState } from "../../reducers/index";
import { LoadingIndicator } from "../LoadingIndicator";
import { watchAction } from "../WatchActionHoc";

interface ILedgerInitProps {
  initLedgerConnection: () => any;
  errorMessage: string;
}

export const LedgerInitComponent: React.SFC<ILedgerInitProps> = ({ errorMessage }) =>
  <div>
    <p>Plug in your Nano Ledger S.</p>
    <ol>
      <li>Unlock it</li>
      <li>Open Ethereum app</li>
      <li>Make sure it's configured correctly:</li>
      <ul>
        <li>Settings -> Contract data -> Yes</li>
        <li>Settings -> Browser suport -> Yes</li>
      </ul>
    </ol>
    <LoadingIndicator />
    {errorMessage &&
      <div>
        {errorMessage}
      </div>}
  </div>;

export const LedgerInit = compose(
  connect(
    (state: IAppState) => ({
      errorMessage: state.walletSelectorState.ledgerWalletError,
    }),
    dispatcher => ({
      initLedgerConnection: () => dispatcher(initLedgerConnection),
    })
  ),
  watchAction({ actionName: "initLedgerConnection", interval: 2000 })
)(LedgerInitComponent);
