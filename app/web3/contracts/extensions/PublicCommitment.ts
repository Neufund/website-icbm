import { BigNumber } from "bignumber.js";

import { Moment } from "moment/moment";
import { asMomentDate } from "../../utils";
import { PublicCommitment as PublicCommitmentBase } from "../PublicCommitment";
import { promisify } from "../typechain-runtime";

export enum InternalCommitmentState {
  BEFORE = 0,
  WHITELIST = 1,
  PUBLIC = 2,
  FINISHED = 3,
}

export class PublicCommitment extends PublicCommitmentBase {
  public get internalCommitmentState(): Promise<InternalCommitmentState> {
    return this.state.then(state => state.toNumber());
  }

  public async startOfDate(stateEnum: InternalCommitmentState): Promise<Moment> {
    return asMomentDate(await promisify(this.rawWeb3Contract.startOf, [stateEnum]));
  }

  public static async createAndValidate(
    web3: any,
    address: string | BigNumber
  ): Promise<PublicCommitment> {
    const contract = new PublicCommitment(web3, address);
    const code = await promisify(web3.eth.getCode, [address]);
    if (code === "0x0") {
      throw new Error(`Contract at ${address} doesn't exist!`);
    }
    return contract;
  }
}
