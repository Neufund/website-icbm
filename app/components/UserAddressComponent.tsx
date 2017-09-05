import * as React from "react";
import { AddressCopyable } from "./AddressCopyable";
import { AddressIcon } from "./AddressIcon";

interface IUserAddressComponentProps {
  address: string;
}

export const UserAddressComponent: React.SFC<IUserAddressComponentProps> = ({ address }) =>
  <div>
    <AddressIcon address={address} />
    <div>Your wallet address</div>
    <AddressCopyable address={address} />
  </div>;
