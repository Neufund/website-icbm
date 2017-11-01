import * as React from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";

import { initLedgerSelectionAction } from "../../actions/walletSelectorActions";
import WalletIntegrationModal from "./WalletIntegrationModal";
import * as styles from "./WalletSelector.scss";

interface IWalletSelectorProps {
  initLedgerSelection: () => any;
}

export const WalletSelector: React.SFC<IWalletSelectorProps> = ({ initLedgerSelection }) => {
  return (
    <div className={styles.walletSelector}>
      <WalletIntegrationModal />
      <h3>Select your wallet</h3>
      <Button className="btn-white">MetaMask/Parity/Mist</Button>
      <Button className="btn-white" onClick={initLedgerSelection}>
        Ledger Wallet
      </Button>
      <Button className="btn-white">No wallet</Button>
    </div>
  );
};

export default connect(null, dispatch => ({
  initLedgerSelection: () => dispatch(initLedgerSelectionAction()),
}))(WalletSelector);
