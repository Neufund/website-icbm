import * as React from "react";
import { connect } from "react-redux";

interface IWalletSelectorProps {
  initLedgerSelection: () => {};
}

export const WalletSelector: React.SFC<IWalletSelectorProps> = ({ initLedgerSelection }) => {
  return (
    <div>
      <div onClick={initLedgerSelection}>Ledger Wallet</div>
    </div>
  );
};

export default connect(null, dispatch => ({
  initLedgerSelection: dispatch(initLedgerSelection),
}))(WalletSelector);
