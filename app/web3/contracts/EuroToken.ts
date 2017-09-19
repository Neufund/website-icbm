import * as BigNumber from "bignumber.js";
import * as EuroTokenAbiJson from "./EuroToken.abi.json";

type BigNumber = BigNumber.BigNumber;

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

function promisify(func: any, args: any): Promise<any> {
  return new Promise((res, rej) => {
    func(...args, (err: any, data: any) => {
      if (err) return rej(err);
      return res(data);
    });
  });
}

class Contract {
  public readonly rawWeb3Contract: any;

  public constructor(web3: any, address: string) {
    this.rawWeb3Contract = web3.eth.contract(EuroTokenAbiJson).at(address);
  }
  public static async createAndValidate(web3: any, address: string): Promise<Contract> {
    const contract = new Contract(web3, address);
    const code = await promisify(web3.eth.getCode, [address]);
    if (code === "0x0") {
      throw new Error(`Contract at ${address} doesn't exist!`);
    }
    return contract;
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
  public get currentMigrationTarget(): Promise<BigNumber | string> {
    return promisify(this.rawWeb3Contract.currentMigrationTarget, []);
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
  public allowedTransferFrom(from: BigNumber | string): Promise<boolean> {
    return promisify(this.rawWeb3Contract.allowedTransferFrom, [from]);
  }
  public balanceOf(owner: BigNumber | string): Promise<BigNumber> {
    return promisify(this.rawWeb3Contract.balanceOf, [owner]);
  }
  public allowedTransferTo(to: BigNumber | string): Promise<boolean> {
    return promisify(this.rawWeb3Contract.allowedTransferTo, [to]);
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
  public setAllowedTransferFromTx(
    from: BigNumber | string,
    allowed: boolean,
    params?: ITxParams
  ): Promise<void> {
    return promisify(this.rawWeb3Contract.setAllowedTransferFrom, [from, allowed, params]);
  }
  public transferFromTx(
    from: BigNumber | string,
    to: BigNumber | string,
    amount: BigNumber,
    params?: ITxParams
  ): Promise<boolean> {
    return promisify(this.rawWeb3Contract.transferFrom, [from, to, amount, params]);
  }
  public withdrawTx(amount: BigNumber, params?: ITxParams): Promise<void> {
    return promisify(this.rawWeb3Contract.withdraw, [amount, params]);
  }
  public depositTx(
    to: BigNumber | string,
    amount: BigNumber,
    params?: ITxParams
  ): Promise<boolean> {
    return promisify(this.rawWeb3Contract.deposit, [to, amount, params]);
  }
  public setAccessPolicyTx(newPolicy: BigNumber | string, params?: ITxParams): Promise<void> {
    return promisify(this.rawWeb3Contract.setAccessPolicy, [newPolicy, params]);
  }
  public migrateTx(params?: ITxParams): Promise<void> {
    return promisify(this.rawWeb3Contract.migrate, [params]);
  }
  public enableMigrationTx(migration: BigNumber | string, params?: ITxParams): Promise<void> {
    return promisify(this.rawWeb3Contract.enableMigration, [migration, params]);
  }
  public transferTx(
    to: BigNumber | string,
    amount: BigNumber,
    params?: ITxParams
  ): Promise<boolean> {
    return promisify(this.rawWeb3Contract.transfer, [to, amount, params]);
  }
  public approveAndCallTx(
    spender: BigNumber | string,
    amount: BigNumber,
    extraData: string,
    params?: ITxParams
  ): Promise<boolean> {
    return promisify(this.rawWeb3Contract.approveAndCall, [spender, amount, extraData, params]);
  }
  public setAllowedTransferToTx(
    to: BigNumber | string,
    allowed: boolean,
    params?: ITxParams
  ): Promise<void> {
    return promisify(this.rawWeb3Contract.setAllowedTransferTo, [to, allowed, params]);
  }
  public reclaimTx(token: BigNumber | string, params?: ITxParams): Promise<void> {
    return promisify(this.rawWeb3Contract.reclaim, [token, params]);
  }
}

export default Contract;
