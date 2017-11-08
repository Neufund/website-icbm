// import { noop } from "lodash";
// import * as React from "react";
// import { Modal } from "react-bootstrap";
// import { connect } from "react-redux";

// import { IAppState } from "../../reducers/index";
// import { selectShouldDisplayIntegrationModal } from "../../reducers/walletSelectorState";
// import EthBrowserWalletInit from "./EthBrowserWalletInit";
// import LedgerAddressChooser from "./LedgerAddressChooser";
// import LedgerInit from "./LedgerInit";

// interface IWalletIntegrationProps {
//   walletInBrowserSelected: boolean;
//   ledgerWalletSelected: boolean;
//   otherWalletSelected: boolean;
// }

// export class WalletIntegrationInstructions extends React.Component<IWalletIntegrationProps> {
//   public render() {
//     if (this.props.ledgerInProgress) {
//       if (this.props.ledgerIntegrationConnected) {
//         return <LedgerAddressChooser />;
//       } else {
//         return <LedgerInit />;
//       }
//     }

//     if (this.props.ethBrowserInProgress) {
//       return <EthBrowserWalletInit />;
//     }

//     return <div />;
//   }
// }

// const mapStateToProps = (state: IAppState) => ({
//   ledgerInProgress: state.walletSelectorState.ledgerIntegrationInProgress,
//   ledgerIntegrationConnected: state.walletSelectorState.ledgerIntegrationConnected,
//   ethBrowserInProgress: state.walletSelectorState.ethBrowserIntegrationInProgress,
// });

// export default connect<IWalletIntegrationProps, {}, {}>(mapStateToProps)(
//   WalletIntegrationInstructions
// );