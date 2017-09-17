import { BigNumber } from "bignumber.js";

import PublicCommitmentAbiJson from "./PublicCommitment.abi.json";

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
    if (code === "0x0") {
      throw new Error(`Contract at ${address} doesn't exist!`);
    }
    return contract;
  }

  public readonly rawWeb3Contract: any;

  public constructor(web3: any, address: string) {
    this.rawWeb3Contract = web3.eth.contract(PublicCommitmentAbiJson).at(address);
  }

  public get state(): Promise<BigNumber> {
    return promisify(this.rawWeb3Contract.state, []);
  }
  public get accessPolicy(): Promise<BigNumber | string> {
    return promisify(this.rawWeb3Contract.accessPolicy, []);
  }
  public estimateNeumarkReward(amountEth: BigNumber): Promise<BigNumber> {
    return promisify(this.rawWeb3Contract.estimateNeumarkReward, [amountEth]);
  }
  public convertToEur(amount: BigNumber): Promise<BigNumber> {
    return promisify(this.rawWeb3Contract.convertToEur, [amount]);
  }
  public startOf(state: BigNumber): Promise<BigNumber> {
    return promisify(this.rawWeb3Contract.startOf, [state]);
  }

  public abortTx(params?: ITxParams): Promise<void> {
    return promisify(this.rawWeb3Contract.abort, [params]);
  }
  public handleTimedTransitionsTx(params?: ITxParams): Promise<void> {
    return promisify(this.rawWeb3Contract.handleTimedTransitions, [params]);
  }
  public commitTx(params?: IPayableTxParams): Promise<void> {
    return promisify(this.rawWeb3Contract.commit, [params]);
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
