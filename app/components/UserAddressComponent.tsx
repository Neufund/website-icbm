import * as React from "react";
import { AddressIcon } from "./AddressIcon";
import { TextCopyable } from "./TextCopyable";
import { addressStyle, icon, userAddressContainer } from "./UserAddressComponent.scss";

interface IUserAddressComponentProps {
  address: string;
}

export const UserAddressComponent: React.SFC<IUserAddressComponentProps> = ({ address }) => (
  <div className={userAddressContainer}>
    <AddressIcon address={address} className={icon} />
    <p>Your wallet address</p>
    <p className={addressStyle}>
      <TextCopyable text={address} maxTextLength={8} />
    </p>
  </div>
);
