import * as React from "react";

import { TokenType } from "../../actions/constants";
import { ILedgerAccount } from "../../reducers/ledgerAddressChooserState";
import MoneyComponent from "../MoneyComponent";
import * as style from "./LedgerAddressChooserTable.scss";

interface ILedgerAddressChooserComponent {
  accounts: ILedgerAccount[];
  handleAddressChosen: (account: ILedgerAccount) => () => void;
}

export const LedgerAddressChooserTable: React.SFC<ILedgerAddressChooserComponent> = ({
  accounts,
  handleAddressChosen,
}) =>
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
          <td
            className={style.useColumn}
            onClick={// tslint:disable-next-line
              () => handleAddressChosen(a)
            }
          >
            <i className="material-icons">done</i>
          </td>
        </tr>
      )}
    </tbody>
  </table>;
