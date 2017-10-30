import { BigNumber } from "bignumber.js";
import * as React from "react";

import { connect } from "react-redux";
import { TokenType } from "../actions/constants";
import { formatMoney } from "../agreements/utils";
import { IAppState } from "../reducers/index";

interface IMoneyComponentProps {
  decimals: number;
}

interface IMoneyComponentOwnProps {
  tokenType: TokenType;
  value: BigNumber;
}

const MoneyComponent: React.SFC<IMoneyComponentProps & IMoneyComponentOwnProps> = ({
  value,
  decimals,
  tokenType,
}) => {
  return (
    <span>
      {formatMoney(decimals, value)} {tokenType === TokenType.ETHER ? "ETH" : "EURO"}
    </span>
  );
};

export default connect<
  IMoneyComponentProps,
  {},
  IMoneyComponentOwnProps
>((state: IAppState, ownProps) => {
  if (ownProps.tokenType === TokenType.ETHER) {
    return { decimals: state.commitmentState.ethDecimals };
  } else {
    return { decimals: state.commitmentState.euroDecimals };
  }
})(MoneyComponent);
