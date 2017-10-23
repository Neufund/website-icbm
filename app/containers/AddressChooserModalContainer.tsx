import * as React from "react";

import { AddressChooserModalComponent } from "../components/AddressChooserModalComponent";
import config from "../config";
import { ledgerInstance, web3Instance } from "../web3/web3Provider";

const NUMBER_OF_ADDRESSES = 5;

export interface IAddresses {
  [derivationPath: string]: {
    address?: string;
    ETH?: number;
  };
}

interface IAddressChooserModalContainerProps {
  handleAddressChosen: (derivationPath: string, address: string) => void;
}

interface IAddressChooserModalContainerState {
  derivationPath: string;
  startingIndex: number;
  addresses: IAddresses;
}

export class AddressChooserModalContainer extends React.Component<
  IAddressChooserModalContainerProps,
  IAddressChooserModalContainerState
> {
  constructor(props: IAddressChooserModalContainerProps) {
    super(props);

    const startingIndex = 0;
    const addresses: IAddresses = {};
    const derivationPath = config.contractsDeployed.defaultDerivationPath;

    this.state = {
      derivationPath,
      startingIndex,
      addresses,
    };

    this.obtainData().catch(error => {
      throw new Error(error);
    });

    this.handleShowPreviousAddresses = this.handleShowPreviousAddresses.bind(this);
    this.handleShowNextAddresses = this.handleShowNextAddresses.bind(this);
    this.handleAddressChosen = this.handleAddressChosen.bind(this);
  }

  public componentDidUpdate(
    _prevProps: IAddressChooserModalContainerProps,
    prevState: IAddressChooserModalContainerState
  ) {
    if (this.state.startingIndex !== prevState.startingIndex) {
      this.obtainData().catch(error => {
        throw new Error(error);
      });
    }
  }

  public render() {
    return (
      <AddressChooserModalComponent
        derivationPath={this.state.derivationPath}
        addresses={this.state.addresses}
        handleShowPreviousAddresses={this.handleShowPreviousAddresses}
        handleShowNextAddresses={this.handleShowNextAddresses}
        handleAddressChosen={this.handleAddressChosen}
      />
    );
  }

  private async obtainData() {
    const stateCopy = { ...this.state };
    stateCopy.addresses = {};

    for (
      let i = stateCopy.startingIndex;
      i < stateCopy.startingIndex + NUMBER_OF_ADDRESSES;
      i = i + 1
    ) {
      stateCopy.addresses[stateCopy.derivationPath + i] = {
        address: null,
        ETH: null,
      };
    }

    let addresses = null;
    try {
      addresses = await ledgerInstance.getMultipleAccountsAsync(
        stateCopy.derivationPath,
        stateCopy.startingIndex,
        Object.keys(stateCopy.addresses).length
      );
    } catch (error) {
      throw new Error(error);
    }

    try {
      for (const dp in addresses) {
        if (addresses.hasOwnProperty(dp)) {
          const address = addresses[dp];
          stateCopy.addresses[dp].address = address;
          stateCopy.addresses[dp].ETH = web3Instance.fromWei(
            await web3Instance.eth.getBalanceAsync(address),
            "ether"
          );

          /* async version just in case we need it
          web3Instance.eth.getBalanceAsync(address).then(
            function(dep: string) {
              return (balanceInWei: BigNumber) => {
                const oldState = this.state;
                oldState.addresses[dep].ETH = web3Instance.fromWei(balanceInWei, "ether");
                this.setState(oldState);
              };
            }.bind(this)(dp)
          );*/
        }
      }
    } catch (error) {
      throw new Error(error);
    }

    this.setState(stateCopy);
  }

  private handleShowPreviousAddresses() {
    const newStartingIndex = this.state.startingIndex - NUMBER_OF_ADDRESSES;
    const newState = {
      ...this.state,
      startingIndex: newStartingIndex < 0 ? 0 : newStartingIndex,
    };
    this.setState(newState);
  }

  private handleShowNextAddresses() {
    const newState = {
      ...this.state,
      startingIndex: this.state.startingIndex + NUMBER_OF_ADDRESSES,
    };
    this.setState(newState);
  }

  private handleAddressChosen(derivationPath: string, address: string) {
    return () => this.props.handleAddressChosen(derivationPath, address);
  }
}

export default AddressChooserModalContainer;
