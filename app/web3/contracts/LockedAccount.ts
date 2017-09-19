import { BigNumber } from "bignumber.js";
import * as LockedAccountAbiJson from "./LockedAccount.abi.json";

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
  public static async createAndValidate(web3: any, address: string): Promise<Contract> {
    const contract = new Contract(web3, address);
    const code = await promisify(web3.eth.getCode, [address]);
    if (code === "0x0") {
      throw new Error(`Contract at ${address} doesn't exist!`);
    }
    return contract;
  }

  public readonly rawWeb3Contract: any;

  public constructor(web3: any, address: string) {
    this.rawWeb3Contract = web3.eth.contract(LockedAccountAbiJson).at(address);
  }

  public get totalLockedAmount(): Promise<BigNumber> {
    return promisify(this.rawWeb3Contract.totalLockedAmount, []);
  }

  public get assetToken(): Promise<BigNumber | string> {
    return promisify(this.rawWeb3Contract.assetToken, []);
  }

  public get totalInvestors(): Promise<BigNumber> {
    return promisify(this.rawWeb3Contract.totalInvestors, []);
  }

  public get lockPeriod(): Promise<BigNumber> {
    return promisify(this.rawWeb3Contract.lockPeriod, []);
  }

  public get lockState(): Promise<BigNumber> {
    return promisify(this.rawWeb3Contract.lockState, []);
  }

  public get currentMigrationTarget(): Promise<BigNumber | string> {
    return promisify(this.rawWeb3Contract.currentMigrationTarget, []);
  }

  public get penaltyFraction(): Promise<BigNumber> {
    return promisify(this.rawWeb3Contract.penaltyFraction, []);
  }

  public get neumark(): Promise<BigNumber | string> {
    return promisify(this.rawWeb3Contract.neumark, []);
  }

  public get accessPolicy(): Promise<BigNumber | string> {
    return promisify(this.rawWeb3Contract.accessPolicy, []);
  }

  public get controller(): Promise<BigNumber | string> {
    return promisify(this.rawWeb3Contract.controller, []);
  }

  public get penaltyDisbursalAddress(): Promise<BigNumber | string> {
    return promisify(this.rawWeb3Contract.penaltyDisbursalAddress, []);
  }

  public balanceOf(investor: BigNumber | string): Promise<[BigNumber, BigNumber, BigNumber]> {
    return promisify(this.rawWeb3Contract.balanceOf, [investor]);
  }

  public setPenaltyDisbursalTx(
    penaltyDisbursalAddress: BigNumber | string,
    params?: ITxParams
  ): Promise<void> {
    return promisify(this.rawWeb3Contract.setPenaltyDisbursal, [penaltyDisbursalAddress, params]);
  }

  public controllerSucceededTx(params?: ITxParams): Promise<void> {
    return promisify(this.rawWeb3Contract.controllerSucceeded, [params]);
  }

  public setAccessPolicyTx(newPolicy: BigNumber | string, params?: ITxParams): Promise<void> {
    return promisify(this.rawWeb3Contract.setAccessPolicy, [newPolicy, params]);
  }

  public migrateTx(params?: ITxParams): Promise<void> {
    return promisify(this.rawWeb3Contract.migrate, [params]);
  }

  public setControllerTx(controller: BigNumber | string, params?: ITxParams): Promise<void> {
    return promisify(this.rawWeb3Contract.setController, [controller, params]);
  }

  public enableMigrationTx(migration: BigNumber | string, params?: ITxParams): Promise<void> {
    return promisify(this.rawWeb3Contract.enableMigration, [migration, params]);
  }

  public unlockTx(params?: ITxParams): Promise<BigNumber> {
    return promisify(this.rawWeb3Contract.unlock, [params]);
  }

  public controllerFailedTx(params?: ITxParams): Promise<void> {
    return promisify(this.rawWeb3Contract.controllerFailed, [params]);
  }

  public lockTx(
    investor: BigNumber | string,
    amount: BigNumber,
    neumarks: BigNumber,
    params?: ITxParams
  ): Promise<void> {
    return promisify(this.rawWeb3Contract.lock, [investor, amount, neumarks, params]);
  }

  public reclaimTx(token: BigNumber | string, params?: ITxParams): Promise<void> {
    return promisify(this.rawWeb3Contract.reclaim, [token, params]);
  }
}

export default Contract;
