import * as React from "react";

interface IAddressCopyableProps {
  address: string;
}

export const AddressCopyable: React.SFC<IAddressCopyableProps> = ({ address }) =>
  <div>
    {address}
  </div>;
