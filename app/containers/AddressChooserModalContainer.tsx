import { debounce } from "lodash";
import * as React from "react";

import { AddressChooserModalComponent } from "../components/AddressChooserModalComponent";
import config from "../config";
import { IDerivationPaths } from "../types";
import { ledgerInstance, web3Instance } from "../web3/web3Provider";

const NUMBER_OF_ADDRESSES_PER_PAGE = 5;

interface IAddressChooserModalContainerProps {
  handleAddressChosen: (derivationPath: string, address: string) => void;
}

interface IAddressChooserModalContainerState {
  derivationPath: string;
  startingIndex: number;
  addresses: IDerivationPaths;
  loading: boolean;
}

export class AddressChooserModalContainer extends React.Component<
  IAddressChooserModalContainerProps,
  IAddressChooserModalContainerState
> {
  private handleDerivationPathChange = debounce((_event: object, newValue: string) => {
    this.setState({
      derivationPath: newValue,
    });
  }, 300);

  constructor(props: IAddressChooserModalContainerProps) {
    super(props);

    const startingIndex = 0;
    const addresses: IDerivationPaths = {};
    const derivationPath = config.contractsDeployed.defaultDerivationPath;

    this.state = {
      derivationPath,
      startingIndex,
      addresses,
      loading: true,
    };
  }

  public componentDidMount() {
    // tslint:disable-next-line no-floating-promises
    this.obtainData();
  }

  public componentDidUpdate(
    _prevProps: IAddressChooserModalContainerProps,
    prevState: IAddressChooserModalContainerState
  ) {
    if (
      this.state.derivationPath !== prevState.derivationPath ||
      this.state.startingIndex !== prevState.startingIndex
    ) {
      // tslint:disable-next-line no-floating-promises
      this.obtainData();
    }
  }

  public render() {
    return (
      <AddressChooserModalComponent
        loading={this.state.loading}
        derivationPath={this.state.derivationPath}
        addresses={this.state.addresses}
        previousAddressesDisabled={this.state.startingIndex <= 0}
        handleShowPreviousAddresses={this.handleShowPreviousAddresses}
        handleShowNextAddresses={this.handleShowNextAddresses}
        handleAddressChosen={this.handleAddressChosen}
        handleDerivationPathChange={this.handleDerivationPathChange}
      />
    );
  }

  private async obtainData() {
    this.setState({ loading: true });
    const stateCopy = { ...this.state };
    stateCopy.addresses = {};
    stateCopy.loading = false;

    for (
      let i = stateCopy.startingIndex;
      i < stateCopy.startingIndex + NUMBER_OF_ADDRESSES_PER_PAGE;
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

  private handleShowPreviousAddresses = () => {
    const newStartingIndex = this.state.startingIndex - NUMBER_OF_ADDRESSES_PER_PAGE;
    const newState = {
      ...this.state,
      startingIndex: newStartingIndex < 0 ? 0 : newStartingIndex,
    };
    this.setState(newState);
  };

  private handleShowNextAddresses = () => {
    const newState = {
      ...this.state,
      startingIndex: this.state.startingIndex + NUMBER_OF_ADDRESSES_PER_PAGE,
    };
    this.setState(newState);
  };

  private handleAddressChosen = (derivationPath: string, address: string) => {
    return () => this.props.handleAddressChosen(derivationPath, address);
  };
}

export default AddressChooserModalContainer;
