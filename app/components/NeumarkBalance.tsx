import { BigNumber } from "bignumber.js";
import * as React from "react";
import { INeumark, Neumark } from "../web3/contracts";
import { asEtherNumber } from "../web3/utils";

interface INeumarkBalanceProps {
  address: string;
}
interface INeumarkBalanceStates {
  isLoading: boolean;
  balance: BigNumber;
}

const getBalance = async (address: string) => {
  return await Neumark().then((neumarkInstance: INeumark) =>
    neumarkInstance.balanceOfAsync(address).then((balance: BigNumber) => balance)
  );
};

export class NeumarkBalance extends React.Component<INeumarkBalanceProps, INeumarkBalanceStates> {
  constructor(props: INeumarkBalanceProps) {
    super(props);
    this.state = { balance: null, isLoading: true };
  }
  public componentWillMount() {
    getBalance(this.props.address).then((addressBalance: BigNumber) => {
      return this.setState({ balance: asEtherNumber(addressBalance), isLoading: false });
    });
  }

  public render() {
    if (this.state.isLoading) {
      return <div>N/A</div>;
    }
    return (
      <div>
        {this.state.balance}
      </div>
    );
  }
}

export default NeumarkBalance;
