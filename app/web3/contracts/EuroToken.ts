import { BigNumber } from "bignumber.js";

import { MissingContractError } from "../../errors";
import { promisify } from "../utils";
import * as EuroTokenAbiJson from "./EuroToken.abi.json";

class EuroToken {
  public static async createAndValidate(web3: any, address: string): Promise<EuroToken> {
    const contract = new EuroToken(web3, address);
    const code = await promisify(web3.eth.getCode, [address]);
    if (process.env.NODE_ENV === "production") {
      return contract;
    }
    if (code === "0x0") {
      throw new MissingContractError("EuroToken", address);
    }
    return contract;
  }

  public readonly rawWeb3Contract: any;

  public constructor(web3: any, address: string) {
    this.rawWeb3Contract = web3.eth.contract(EuroTokenAbiJson).at(address);
  }

  public get decimals(): Promise<BigNumber> {
    return promisify(this.rawWeb3Contract.decimals, []);
  }

  public balanceOf(owner: BigNumber | string): Promise<BigNumber> {
    return promisify(this.rawWeb3Contract.balanceOf, [owner]);
  }
}

export default EuroToken;
