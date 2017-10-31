import TextField from "material-ui/TextField";
import * as React from "react";

import { TokenType } from "../../actions/constants";
import { ILedgerAccount } from "../../reducers/ledgerAddressChooserState";
import MoneyComponent from "../MoneyComponent";
import * as style from "./LedgerAddressChooserComponent.scss";

interface ILedgerAddressChooserComponent {
  derivationPath: string;
  accounts: ILedgerAccount[];
  handleAddressChosen: (account: ILedgerAccount) => () => void;
  handleDerivationPathChange: (event: object, newValue: string) => void;
}

export const LedgerAddressChooserComponent: React.SFC<ILedgerAddressChooserComponent> = ({
  derivationPath,
  accounts,
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
        {accounts.map(a =>
          <tr key={a.derivationPath}>
            <td>
              {a.derivationPath}
            </td>
            <td>
              {a.address}
            </td>
            <td>
              <MoneyComponent value={a.balance} tokenType={TokenType.ETHER} />
            </td>
            <td className={style.useColumn} onClick={handleAddressChosen(a)}>
              <i className="material-icons">done</i>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>;
