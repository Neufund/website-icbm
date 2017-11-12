import * as cn from "classnames";
import * as React from "react";

import { TokenType } from "../../actions/constants";
import { ILedgerAccount } from "../../reducers/ledgerAddressChooserState";
import MoneyComponent from "../MoneyComponent";
import * as style from "./LedgerAddressChooserTable.scss";

interface ILedgerAddressChooserComponent {
  accounts: ILedgerAccount[];
  hasPrevious: boolean;
  loading: boolean;
  handleAddressChosen: (account: ILedgerAccount) => () => void;
  showPrevAddresses: () => any;
  showNextAddresses: () => any;
}

export const LedgerAddressChooserTable: React.SFC<ILedgerAddressChooserComponent> = ({
  accounts,
  hasPrevious,
  loading,
  handleAddressChosen,
  showPrevAddresses,
  showNextAddresses,
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
        <tr
          key={a.derivationPath}
          onClick={// tslint:disable-next-line
          () => handleAddressChosen(a)}
          className={cn(style.useColumn, { [style.withEther]: parseInt(a.balance, 10) > 0 })}
        >
          <td>
            {a.derivationPath}
          </td>
          <td>
            {a.address}
          </td>
          <td>
            <MoneyComponent value={a.balance} tokenType={TokenType.ETHER} />
          </td>
          <td>
            <i className="fa fa-chevron-right" aria-hidden="true" />
          </td>
        </tr>
      )}
    </tbody>
    <tfoot>
      <tr>
        <td colSpan={4}>
          <div>
            {hasPrevious &&
              <button className="btn btn-white" disabled={loading} onClick={showPrevAddresses}>
                show previous addresses
              </button>}
            <button
              className="btn btn-white pull-right"
              disabled={loading}
              onClick={showNextAddresses}
            >
              Load more addresses
            </button>
          </div>
        </td>
      </tr>
    </tfoot>
  </table>;
