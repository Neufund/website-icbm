import { debounce } from "lodash";
import * as React from "react";

import { Modal } from "react-bootstrap";
import { IDerivationPaths } from "../../types";
import { connect } from "react-redux";
import { IAppState } from "../../reducers/index";

const NUMBER_OF_ADDRESSES_PER_PAGE = 5;

// interface IAddressChooserModalContainerProps {
//   handleAddressChosen: (derivationPath: string, address: string) => void;
// }

// interface IAddressChooserModalContainerState {
//   derivationPath: string;
//   startingIndex: number;
//   addresses: IDerivationPaths;
//   loading: boolean;
// }

export class LedgerAddressChooser extends React.Component<{}> {
  componentDidMount() {

  }

  public render() {
    return (
      <div>
        <Modal.Header>
          <Modal.Title>Choose your address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h1>Chooser!</h1>
        </Modal.Body>
        <Modal.Footer />
      </div>
    );
  }
}

// const stateToProps = (state: IAppState) => ({

// })

// const dispatchToProps = (dispatcher) => ({
//   getAddresses
// })

// export default connect()(LedgerAddressChooser);

export default LedgerAddressChooser;
