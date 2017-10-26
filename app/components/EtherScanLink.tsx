import * as React from "react";
import { connect } from "react-redux";

import { EtherScanLinkType, EthNetwork } from "../actions/constants";
import { IAppState } from "../reducers/index";
import { selectEthNetwork } from "../reducers/web3State";
import { etherscanUrl } from "../utils/etherscan";

interface IEtherScanTxLinkComponent {
  type: EtherScanLinkType;
  ethNetwork: EthNetwork;
  id: string | number;
  className?: string;
}

export const EtherScanLinkComponent: React.SFC<IEtherScanTxLinkComponent> = ({
  type,
  ethNetwork,
  id,
  className,
  children,
}) => {
  return (
    <a href={etherscanUrl(type, id, ethNetwork)} className={className}>
      {children === undefined ? id : children}
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
  type: EtherScanLinkType;
  id: string | number;
  className?: string;
}

export default connect<IMapStateToProps, {}, IPropsFromProps>(mapStateToProps)(
  EtherScanLinkComponent
);
