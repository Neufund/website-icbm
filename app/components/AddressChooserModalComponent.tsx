import TextField from "material-ui/TextField";
import * as React from "react";
import { Button, Modal } from "react-bootstrap";

import { IAddresses } from "../containers/AddressChooserModalContainer";
import * as style from "./AddressChooserModalComponent.scss";

interface IAddressChooserModalComponent {
  derivationPath: string;
  addresses: IAddresses;
  handleShowPreviousAddresses: () => void;
  handleShowNextAddresses: () => void;
  handleAddressChosen: (derivationPath: string, address: string) => () => void;
}

// tslint:disable-next-line
const noop = () => {};

export const AddressChooserModalComponent: React.SFC<IAddressChooserModalComponent> = ({
  derivationPath,
  addresses,
  handleShowPreviousAddresses,
  handleShowNextAddresses,
  handleAddressChosen,
}) =>
  <Modal bsSize="large" show onHide={noop}>
    <Modal.Header>
      <Modal.Title>Choose your address</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <div>
        <TextField name="derivationPathField" defaultValue={derivationPath} />
        - provide your derivation path
      </div>
      <div>
        <table className={style.table}>
          <thead>
            <tr>
              <th>derivation path</th>
              <th>address</th>
              <th>ETH balance</th>
              <th>use it</th>
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
                  v
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Modal.Body>
    <Modal.Footer className={style.footer}>
      <Button bsStyle="primary" onClick={handleShowPreviousAddresses}>
        show previous addresses
      </Button>
      <Button bsStyle="primary" onClick={handleShowNextAddresses}>
        show next addresses
      </Button>
    </Modal.Footer>
  </Modal>;
