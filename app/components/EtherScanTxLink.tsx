import * as React from "react";
import { connect } from "react-redux";

import { EthNetwork } from "../actions/constants";
import { IAppState } from "../reducers/index";
import { selectEthNetwork } from "../reducers/web3State";
import { etherscanTransactionUrl } from "../utils/etherscan";

interface IEtherScanTxLinkComponent {
  ethNetwork: EthNetwork;
  tx: string;
  className?: string;
}

export const EtherScanTxLinkComponent: React.SFC<IEtherScanTxLinkComponent> = ({
  ethNetwork,
  tx,
  className,
  children,
}) => {
  const url = etherscanTransactionUrl(tx, ethNetwork);

  const props: { className?: string } = {};
  if (className !== undefined) {
    props.className = className;
  }

  return (
    <a href={url} {...props}>
      {children === undefined ? tx : children}
    </a>
  );
};

interface IMapStateToProps {
  ethNetwork: EthNetwork;
}

function mapStateToProps(state: IAppState) {
  return {
    ethNetwork: selectEthNetwork(state.web3State),
  };
}

interface IPropsFromProps {
  tx: string;
  className?: string;
}

export default connect<IMapStateToProps, {}, IPropsFromProps>(mapStateToProps)(
  EtherScanTxLinkComponent
);
