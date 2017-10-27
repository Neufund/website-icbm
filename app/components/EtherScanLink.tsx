import * as React from "react";
import { connect } from "react-redux";

import { EtherScanLinkType, EthNetwork } from "../actions/constants";
import { IAppState } from "../reducers/index";
import { selectEthNetwork } from "../reducers/web3State";
import { etherscanUrl } from "../utils/etherscan";

interface IEtherScanTxLinkComponent {
  linkType: EtherScanLinkType;
  ethNetwork: EthNetwork;
  resourceId: string | number;
}

export const EtherScanLinkComponent: React.SFC<
  IEtherScanTxLinkComponent & React.AnchorHTMLAttributes<HTMLAnchorElement>
> = ({ linkType, ethNetwork, resourceId, children, ...props }) =>
  <a href={etherscanUrl(linkType, resourceId, ethNetwork)} {...props}>
    {children === undefined ? resourceId : children}
  </a>;

interface IMapStateToProps {
  ethNetwork: EthNetwork;
}

function mapStateToProps(state: IAppState) {
  return {
    ethNetwork: selectEthNetwork(state.web3State),
  };
}

interface IPropsFromProps {
  linkType: EtherScanLinkType;
  resourceId: string | number;
}

export default connect<
  IMapStateToProps,
  null,
  IPropsFromProps & React.AnchorHTMLAttributes<HTMLAnchorElement>
>(mapStateToProps, {})(EtherScanLinkComponent);
