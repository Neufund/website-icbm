import * as React from "react";

interface IAddressIconProps {
  address: string;
}

export const AddressIcon: React.SFC<IAddressIconProps> = ({ address }) =>
  <div>
    {address}
  </div>;
