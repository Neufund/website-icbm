import { BigNumber } from "bignumber.js";

import { MissingContractError } from "../../errors";
import { promisify } from "../utils";
import * as LockedAccountAbiJson from "./LockedAccount.abi.json";

class Contract {
  public static async createAndValidate(web3: any, address: string): Promise<Contract> {
    const contract = new Contract(web3, address);
    if (process.env.NODE_ENV === "production") {
      return contract;
    }
    const code = await promisify(web3.eth.getCode, [address]);
    if (code === "0x0") {
      throw new MissingContractError("LockedAccount", address);
    }
    return contract;
  }

  public readonly rawWeb3Contract: any;
  public readonly address: string;

  public constructor(web3: any, address: string) {
    this.address = address;
    this.rawWeb3Contract = web3.eth.contract(LockedAccountAbiJson).at(address);
  }

  public get assetToken(): Promise<string> {
    return promisify(this.rawWeb3Contract.assetToken, []);
  }

  public get totalInvestors(): Promise<BigNumber> {
    return promisify(this.rawWeb3Contract.totalInvestors, []);
  }

  public get lockPeriod(): Promise<BigNumber> {
    return promisify(this.rawWeb3Contract.lockPeriod, []);
  }

  public get penaltyFraction(): Promise<BigNumber> {
    return promisify(this.rawWeb3Contract.penaltyFraction, []);
  }

  public get penaltyDisbursalAddress(): Promise<string> {
    return promisify(this.rawWeb3Contract.penaltyDisbursalAddress, []);
  }

  public balanceOf(investor: BigNumber | string): Promise<[BigNumber, BigNumber, BigNumber]> {
    return promisify(this.rawWeb3Contract.balanceOf, [investor]);
  }
}

export default Contract;
