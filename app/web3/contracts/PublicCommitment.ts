import { BigNumber } from "bignumber.js";
import { Moment } from "moment/moment";

import { MissingContractError } from "../../errors";
import { asMomentDate } from "../utils";
import * as PublicCommitmentAbiJson from "./PublicCommitment.abi.json";

interface IPayableTxParams {
  value: string | BigNumber;
  from?: string;
  gas?: number | string | BigNumber;
  gasPrice?: number | string | BigNumber;
}

// represents same values that are used internally in commitment smartcontract
export enum InternalCommitmentState {
  BEFORE = 0,
  WHITELIST = 1,
  PUBLIC = 2,
  FINISHED = 3,
}

function promisify(func: any, args: any): Promise<any> {
  return new Promise((res, rej) => {
    func(...args, (err: any, data: any) => {
      if (err) {
        return rej(err);
      }
      return res(data);
    });
  });
}

class Contract {
  public static async createAndValidate(web3: any, address: string): Promise<Contract> {
    const contract = new Contract(web3, address);
    if (process.env.NODE_ENV === "production") {
      return contract;
    }
    const code = await promisify(web3.eth.getCode, [address]);
    if (code === "0x0" || code === "0x") {
      throw new MissingContractError("PublicCommitment", address);
    }
    return contract;
  }

  public readonly rawWeb3Contract: any;

  public constructor(public readonly web3: any, public readonly address: string) {
    this.rawWeb3Contract = web3.eth.contract(PublicCommitmentAbiJson).at(address);
  }

  public get state(): Promise<InternalCommitmentState> {
    return promisify(this.rawWeb3Contract.state, []).then((state: BigNumber) => {
      return state.toNumber();
    });
  }

  public get platformOperatorNeumarkRewardShare(): Promise<BigNumber> {
    return promisify(this.rawWeb3Contract.platformOperatorNeumarkRewardShare, []);
  }

  public get maxCapEur(): Promise<BigNumber> {
    return promisify(this.rawWeb3Contract.maxCapEur, []);
  }

  public get minTicketEur(): Promise<BigNumber> {
    return promisify(this.rawWeb3Contract.minTicketEur, []);
  }

  public get ethEurFraction(): Promise<BigNumber> {
    return promisify(this.rawWeb3Contract.ethEurFraction, []);
  }

  public currentAgreement(): Promise<[BigNumber, BigNumber, string, BigNumber]> {
    return promisify(this.rawWeb3Contract.currentAgreement, []);
  }

  public get neumark(): Promise<string> {
    return promisify(this.rawWeb3Contract.neumark, []);
  }

  public get etherLock(): Promise<string> {
    return promisify(this.rawWeb3Contract.etherLock, []);
  }

  public get euroLock(): Promise<string> {
    return promisify(this.rawWeb3Contract.euroLock, []);
  }

  public estimateNeumarkReward(amountEth: string): Promise<BigNumber> {
    return promisify(this.rawWeb3Contract.estimateNeumarkReward, [amountEth]);
  }

  public async startOf(stateEnum: InternalCommitmentState): Promise<Moment> {
    return asMomentDate(await promisify(this.rawWeb3Contract.startOf, [stateEnum]));
  }

  public async whitelistTicket(
    investorAddress: BigNumber | string
  ): Promise<[BigNumber, BigNumber, BigNumber]> {
    return promisify(this.rawWeb3Contract.whitelistTicket, [investorAddress]);
  }

  public commitTx(params?: IPayableTxParams, customWeb3?: any): Promise<string> {
    if (customWeb3) {
      const tmpContract = customWeb3.eth.contract(PublicCommitmentAbiJson).at(this.address);
      return promisify(tmpContract.commit.sendTransaction, [params]);
    } else {
      return promisify(this.rawWeb3Contract.commit.sendTransaction, [params]);
    }
  }
}

export default Contract;
