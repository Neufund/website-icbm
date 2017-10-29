import { BigNumber } from "bignumber.js";

import { Moment } from "moment/moment";
import { asMomentDate } from "../utils";
import * as PublicCommitmentAbiJson from "./PublicCommitment.abi.json";

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
    const code = await promisify(web3.eth.getCode, [address]);
    if (code === "0x0" || code === "0x") {
      throw new Error(`Contract at ${address} doesn't exist!`);
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

  public get maxCapEur(): Promise<BigNumber> {
    return promisify(this.rawWeb3Contract.maxCapEur, []);
  }

  public get minTicketEur(): Promise<BigNumber> {
    return promisify(this.rawWeb3Contract.minTicketEur, []);
  }

  public get ethEurFraction(): Promise<BigNumber> {
    return promisify(this.rawWeb3Contract.ethEurFraction, []);
  }

  public get issuanceRate(): Promise<BigNumber> {
    return (async () => {
      const eth = new this.web3.BigNumber(10).pow(
        // this.ethToken().decimals()
        18
      );
      const nmk = new this.web3.BigNumber(10).pow(
        // this.commit.neumark().decimals()
        18
      );
      return (await this.estimateNeumarkReward(eth.toNumber())).div(nmk);
    })();
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

  public get accessPolicy(): Promise<BigNumber | string> {
    return promisify(this.rawWeb3Contract.accessPolicy, []);
  }

  public estimateNeumarkReward(amountEth: BigNumber): Promise<BigNumber> {
    return promisify(this.rawWeb3Contract.estimateNeumarkReward, [amountEth]);
  }

  public convertToEur(amount: number): Promise<BigNumber> {
    return promisify(this.rawWeb3Contract.convertToEur, [amount]);
  }

  public async startOf(stateEnum: InternalCommitmentState): Promise<Moment> {
    return asMomentDate(await promisify(this.rawWeb3Contract.startOf, [stateEnum]));
  }

  public abortTx(params?: ITxParams): Promise<void> {
    return promisify(this.rawWeb3Contract.abort, [params]);
  }

  public handleTimedTransitionsTx(params?: ITxParams): Promise<void> {
    return promisify(this.rawWeb3Contract.handleTimedTransitions, [params]);
  }

  public commitTx(params?: IPayableTxParams, customWeb3?: any): Promise<string> {
    if (customWeb3) {
      const tmpContract = customWeb3.eth.contract(PublicCommitmentAbiJson).at(this.address);
      return promisify(tmpContract.commit.sendTransaction, [params]);
    } else {
      return promisify(this.rawWeb3Contract.commit.sendTransaction, [params]);
    }
  }

  public setAccessPolicyTx(newPolicy: BigNumber | string, params?: ITxParams): Promise<void> {
    return promisify(this.rawWeb3Contract.setAccessPolicy, [newPolicy, params]);
  }

  public addWhitelistedTx(
    investors: BigNumber[] | string[],
    tokens: BigNumber[],
    amounts: BigNumber[],
    params?: ITxParams
  ): Promise<void> {
    return promisify(this.rawWeb3Contract.addWhitelisted, [investors, tokens, amounts, params]);
  }

  public commitEuroTx(params?: ITxParams): Promise<void> {
    return promisify(this.rawWeb3Contract.commitEuro, [params]);
  }

  public reclaimTx(token: BigNumber | string, params?: ITxParams): Promise<void> {
    return promisify(this.rawWeb3Contract.reclaim, [token, params]);
  }
}

export default Contract;
