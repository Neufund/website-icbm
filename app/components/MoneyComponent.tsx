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
  value: BigNumber | string;
  valueClass?: string;
}

const MoneyComponent: React.SFC<IMoneyComponentProps & IMoneyComponentOwnProps> = ({
  value,
  decimals,
  tokenType,
  valueClass,
}) => {
  if (!decimals) {
    throw new Error("Couldnt get TOKEN details!");
  }

  return (
    <span>
      <span className={valueClass}>{formatMoney(decimals, value)}</span>{" "}
      {tokenTypeToSymbol(tokenType)}
    </span>
  );
};

function tokenTypeToSymbol(token: TokenType): string {
  switch (token) {
    case TokenType.ETHER:
      return "ETH";
    case TokenType.EURO:
      return "EURO";
    case TokenType.NEU:
      return "NEU";
    default:
      throw new Error(`Token ${token} not supported`);
  }
}

function tokenTypeToDecimals(token: TokenType, state: IAppState): number {
  switch (token) {
    case TokenType.ETHER:
      return state.commitmentState.ethDecimals;
    case TokenType.EURO:
      return state.commitmentState.euroDecimals;
    case TokenType.NEU:
      return state.commitmentState.neuDecimals;
    default:
      throw new Error(`Token ${token} not supported`);
  }
}

export default connect<
  IMoneyComponentProps,
  {},
  IMoneyComponentOwnProps
>((state: IAppState, ownProps) => {
  return {
    decimals: tokenTypeToDecimals(ownProps.tokenType, state),
  };
})(MoneyComponent);
