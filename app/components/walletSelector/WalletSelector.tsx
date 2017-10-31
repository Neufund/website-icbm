import * as React from "react";
import { connect } from "react-redux";
import { initLedgerSelectionAction } from "../../actions/walletSelectorActions";
import WalletIntegrationModal from "./WalletIntegrationModal";

interface IWalletSelectorProps {
  initLedgerSelection: () => any;
}

export const WalletSelector: React.SFC<IWalletSelectorProps> = ({ initLedgerSelection }) => {
  return (
    <div>
      <WalletIntegrationModal />
      <h3>Select your wallet</h3>
      <div onClick={initLedgerSelection}>Ledger Wallet</div>
    </div>
  );
};

export default connect(null, dispatch => ({
  initLedgerSelection: () => dispatch(initLedgerSelectionAction()),
}))(WalletSelector);
