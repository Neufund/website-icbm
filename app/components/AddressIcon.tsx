import * as React from "react";
import * as image from "../assets/img/account_icon.png";

interface IAddressIconProps {
  address: string;
  className?: string;
}

export const AddressIcon: React.SFC<IAddressIconProps> = ({ address, className }) =>
  <img src={image} className={className} alt={address} />;
