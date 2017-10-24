import TextField from "material-ui/TextField";
import * as React from "react";
import { Button, Modal } from "react-bootstrap";

import { IDerivationPaths } from "../types";
import * as style from "./AddressChooserModalComponent.scss";
import { LoadingIndicator } from "./LoadingIndicator";

interface IAddressChooserModalComponent {
  loading: boolean;
  derivationPath: string;
  addresses: IDerivationPaths;
  previousAddressesDisabled: boolean;
  handleShowPreviousAddresses: () => void;
  handleShowNextAddresses: () => void;
  handleAddressChosen: (derivationPath: string, address: string) => () => void;
  handleDerivationPathChange: (event: object, newValue: string) => void;
}

// tslint:disable-next-line
const noop = () => {};

export const AddressChooserModalComponent: React.SFC<IAddressChooserModalComponent> = ({
  loading,
  derivationPath,
  addresses,
  previousAddressesDisabled,
  handleShowPreviousAddresses,
  handleShowNextAddresses,
  handleAddressChosen,
  handleDerivationPathChange,
}) =>
  <Modal bsSize="large" show onHide={noop}>
    <Modal.Header>
      <Modal.Title>Choose your address</Modal.Title>
    </Modal.Header>
    {loading
      ? <LoadingIndicator />
      : <div>
          <Modal.Body>
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
          </Modal.Body>
          <Modal.Footer className={style.footer}>
            <Button
              bsStyle="primary"
              disabled={previousAddressesDisabled}
              onClick={handleShowPreviousAddresses}
            >
              show previous addresses
            </Button>
            <Button bsStyle="primary" onClick={handleShowNextAddresses}>
              show next addresses
            </Button>
          </Modal.Footer>
        </div>}
  </Modal>;
