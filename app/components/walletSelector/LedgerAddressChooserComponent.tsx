import { noop } from "lodash";
import TextField from "material-ui/TextField";
import * as React from "react";
import { Button, Modal } from "react-bootstrap";

import { IDerivationPaths } from "../../types";
import { LoadingIndicator } from "../LoadingIndicator";
import * as style from "./AddressChooserModalComponent.scss";

interface ILedgerAddressChooserComponent {
  loading: boolean;
  derivationPath: string;
  addresses: IDerivationPaths;
  handleAddressChosen: (derivationPath: string, address: string) => () => void;
  handleDerivationPathChange: (event: object, newValue: string) => void;
}

export const LedgerAddressChooserComponent: React.SFC<ILedgerAddressChooserComponent> = ({
  derivationPath,
  addresses,
  handleAddressChosen,
  handleDerivationPathChange,
}) =>
  <div>
    <div>
      <TextField
        name="derivationPathField"
        defaultValue={derivationPath}
        onChange={handleDerivationPathChange}
      />
      - provide your derivation path
    </div>
    <table className={style.table}>
      <thead>
        <tr>
          <th>derivation path</th>
          <th>address</th>
          <th>ETH balance</th>
          <th className={style.useColumn}>use address</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(addresses).map(dp =>
          <tr key={dp}>
            <td>
              {dp}
            </td>
            <td>
              {addresses[dp].address}
            </td>
            <td>
              {addresses[dp].ETH.toString()}
            </td>
            <td
              className={style.useColumn}
              onClick={handleAddressChosen(dp, addresses[dp].address)}
            >
              <i className="material-icons">done</i>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>;
