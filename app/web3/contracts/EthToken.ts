import { BigNumber } from "bignumber.js";

import { MissingContractError } from "../../errors";
import { promisify } from "../utils";
import * as EthTokenAbiJson from "./EthToken.abi.json";

class EthToken {
  public static async createAndValidate(web3: any, address: string): Promise<EthToken> {
    const contract = new EthToken(web3, address);
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

  public get decimals(): Promise<BigNumber> {
    return promisify(this.rawWeb3Contract.decimals, []);
  }

  public balanceOf(owner: BigNumber | string): Promise<BigNumber> {
    return promisify(this.rawWeb3Contract.balanceOf, [owner]);
  }
}

export default EthToken;
