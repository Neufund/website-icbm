import { BigNumber } from "bignumber.js";
import * as React from "react";

import { connect } from "react-redux";
import { InvestorType, TokenType, Web3Type } from "../actions/constants";
import { IAppState } from "../reducers/index";
import { selectBalance, selectReservedTicket } from "../reducers/userState";
import { AddressIcon } from "./AddressIcon";
import MoneyComponent from "./MoneyComponent";
import { TextCopyable } from "./TextCopyable";

import { icon, userAddressContainer, value } from "./UserInfo.scss";

interface IUserAddressComponentProps {
  address: string;
  balance: BigNumber;
  web3Provider: Web3Type;
  investorType: InvestorType;
  reservedTicket: BigNumber;
}

export const UserInfoComponent: React.SFC<IUserAddressComponentProps> = ({
  address,
  web3Provider,
  balance,
  investorType,
  reservedTicket,
}) =>
  <div className={userAddressContainer}>
    <AddressIcon address={address} className={icon} />
    <p>Your wallet address:</p>
    <p className={value}>
      <TextCopyable text={address} />
    </p>
    <p>Your balance:</p>
    <p className={value}>
      <MoneyComponent tokenType={TokenType.ETHER} value={balance} />
    </p>
    <p>Your wallet type:</p>
    <p className={value}>
      <span>
        {web3Provider}
      </span>
    </p>
    <p>ICBM phase:</p>
    <p className={value}>
      <span>
        {investorType}
      </span>
    </p>
    {reservedTicket.gt(new BigNumber(0)) &&
      <div>
        <p>Reserved ticket</p>
        <p className={value}>
          <span>
            <MoneyComponent tokenType={TokenType.ETHER} value={reservedTicket} />
          </span>
        </p>
      </div>}
  </div>;

export const UserInfo = connect((state: IAppState) => ({
  address: state.userState.address,
  balance: selectBalance(state.userState),
  web3Provider: state.web3State.web3Type,
  investorType: state.userState.investorType,
  reservedTicket: selectReservedTicket(state.userState),
}))(UserInfoComponent);
