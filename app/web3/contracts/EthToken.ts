import { BigNumber } from "bignumber.js";

import { MissingContractError } from "../../errors";
import { promisify } from "../utils";
import * as EthTokenAbiJson from "./EthToken.abi.json";

interface ITxParams {
  from?: string;
  gas?: number | string | BigNumber;
  gasPrice?: number | string | BigNumber;
}

interface IPayableTxParams {
  value: string | BigNumber;
  from?: string;
  gas?: number | string | BigNumber;
  gasPrice?: number | string | BigNumber;
}

class Contract {
  public static async createAndValidate(web3: any, address: string): Promise<Contract> {
    const contract = new Contract(web3, address);
    if (process.env.NODE_ENV === "production") {
      return contract;
    }
    const code = await promisify(web3.eth.getCode, [address]);
    if (code === "0x0") {
      throw new MissingContractError("EthToken", address);
    }
    return contract;
  }

  public readonly rawWeb3Contract: any;

  public constructor(web3: any, address: string) {
    this.rawWeb3Contract = web3.eth.contract(EthTokenAbiJson).at(address);
  }

  public get name(): Promise<string> {
    return promisify(this.rawWeb3Contract.name, []);
  }
  public get totalSupply(): Promise<BigNumber> {
    return promisify(this.rawWeb3Contract.totalSupply, []);
  }
  public get decimals(): Promise<BigNumber> {
    return promisify(this.rawWeb3Contract.decimals, []);
  }
  public get version(): Promise<string> {
    return promisify(this.rawWeb3Contract.version, []);
  }
  public get symbol(): Promise<string> {
    return promisify(this.rawWeb3Contract.symbol, []);
  }
  public get accessPolicy(): Promise<BigNumber | string> {
    return promisify(this.rawWeb3Contract.accessPolicy, []);
  }
  public balanceOf(owner: BigNumber | string): Promise<BigNumber> {
    return promisify(this.rawWeb3Contract.balanceOf, [owner]);
  }
  public allowance(owner: BigNumber | string, spender: BigNumber | string): Promise<BigNumber> {
    return promisify(this.rawWeb3Contract.allowance, [owner, spender]);
  }

  public approveTx(
    spender: BigNumber | string,
    value: BigNumber,
    params?: ITxParams
  ): Promise<boolean> {
    return promisify(this.rawWeb3Contract.approve, [spender, value, params]);
  }
  public transferFromTx(
    from: BigNumber | string,
    to: BigNumber | string,
    value: BigNumber,
    params?: ITxParams
  ): Promise<boolean> {
    return promisify(this.rawWeb3Contract.transferFrom, [from, to, value, params]);
  }
  public withdrawTx(amount: BigNumber, params?: ITxParams): Promise<void> {
    return promisify(this.rawWeb3Contract.withdraw, [amount, params]);
  }
  public setAccessPolicyTx(newPolicy: BigNumber | string, params?: ITxParams): Promise<void> {
    return promisify(this.rawWeb3Contract.setAccessPolicy, [newPolicy, params]);
  }
  public transferTx(
    to: BigNumber | string,
    value: BigNumber,
    params?: ITxParams
  ): Promise<boolean> {
    return promisify(this.rawWeb3Contract.transfer, [to, value, params]);
  }
  public approveAndCallTx(
    spender: BigNumber | string,
    amount: BigNumber,
    extraData: string,
    params?: ITxParams
  ): Promise<boolean> {
    return promisify(this.rawWeb3Contract.approveAndCall, [spender, amount, extraData, params]);
  }
  public depositTx(params?: IPayableTxParams): Promise<void> {
    return promisify(this.rawWeb3Contract.deposit, [params]);
  }
  public reclaimTx(token: BigNumber | string, params?: ITxParams): Promise<void> {
    return promisify(this.rawWeb3Contract.reclaim, [token, params]);
  }
}

export default Contract;
