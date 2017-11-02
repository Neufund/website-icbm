import { BigNumber } from "bignumber.js";

import { MissingContractError } from "../../errors";
import { promisify } from "../utils";
import * as NeumarkAbiJson from "./Neumark.abi.json";

interface ITxParams {
  from?: string;
  gas?: number | string | BigNumber;
  gasPrice?: number | string | BigNumber;
}

class Contract {
  public static async createAndValidate(web3: any, address: string): Promise<Contract> {
    const contract = new Contract(web3, address);
    const code = await promisify(web3.eth.getCode, [address]);
    if (code === "0x0") {
      throw new MissingContractError("Neumark", address);
    }
    return contract;
  }

  public readonly rawWeb3Contract: any;

  public constructor(web3: any, address: string) {
    this.rawWeb3Contract = web3.eth.contract(NeumarkAbiJson).at(address);
  }

  public get name(): Promise<string> {
    return promisify(this.rawWeb3Contract.name, []);
  }

  public get totalSupply(): Promise<BigNumber> {
    return promisify(this.rawWeb3Contract.totalSupply, []);
  }

  public get totalEuroUlps(): Promise<BigNumber> {
    return promisify(this.rawWeb3Contract.totalEuroUlps, []);
  }

  public get decimals(): Promise<BigNumber> {
    return promisify(this.rawWeb3Contract.decimals, []);
  }

  public get transferEnabled(): Promise<boolean> {
    return promisify(this.rawWeb3Contract.transferEnabled, []);
  }

  public get version(): Promise<string> {
    return promisify(this.rawWeb3Contract.version, []);
  }

  public get symbol(): Promise<string> {
    return promisify(this.rawWeb3Contract.symbol, []);
  }

  public get ethereumForkArbiter(): Promise<BigNumber | string> {
    return promisify(this.rawWeb3Contract.ethereumForkArbiter, []);
  }

  public get accessPolicy(): Promise<BigNumber | string> {
    return promisify(this.rawWeb3Contract.accessPolicy, []);
  }

  public snapshotAt(timestamp: BigNumber): Promise<BigNumber> {
    return promisify(this.rawWeb3Contract.snapshotAt, [timestamp]);
  }

  public isAgreementSignedBy(signatory: BigNumber | string): Promise<boolean> {
    return promisify(this.rawWeb3Contract.isAgreementSignedBy, [signatory]);
  }

  public balanceOfAt(owner: BigNumber | string, snapshot: BigNumber): Promise<BigNumber> {
    return promisify(this.rawWeb3Contract.balanceOfAt, [owner, snapshot]);
  }

  public cumulativeInverse(
    neumarkUlps: BigNumber,
    min: BigNumber,
    max: BigNumber
  ): Promise<BigNumber> {
    return promisify(this.rawWeb3Contract.cumulativeInverse, [neumarkUlps, min, max]);
  }

  public balanceOf(owner: BigNumber | string): Promise<BigNumber> {
    return promisify(this.rawWeb3Contract.balanceOf, [owner]);
  }

  public cumulative(euroUlps: BigNumber): Promise<BigNumber> {
    return promisify(this.rawWeb3Contract.cumulative, [euroUlps]);
  }

  public pastAgreement(
    amendmentIndex: BigNumber
  ): Promise<[BigNumber, BigNumber, string, BigNumber]> {
    return promisify(this.rawWeb3Contract.pastAgreement, [amendmentIndex]);
  }

  public totalSupplyAt(snapshot: BigNumber): Promise<BigNumber> {
    return promisify(this.rawWeb3Contract.totalSupplyAt, [snapshot]);
  }

  public currentAgreement(): Promise<[BigNumber, BigNumber, string, BigNumber]> {
    return promisify(this.rawWeb3Contract.currentAgreement, []);
  }

  public allowance(owner: BigNumber | string, spender: BigNumber | string): Promise<BigNumber> {
    return promisify(this.rawWeb3Contract.allowance, [owner, spender]);
  }

  public incrementalInverse(neumarkUlps: BigNumber): Promise<BigNumber> {
    return promisify(this.rawWeb3Contract.incrementalInverse, [neumarkUlps]);
  }

  public incremental(totalEuroUlps: BigNumber, euroUlps: BigNumber): Promise<BigNumber> {
    return promisify(this.rawWeb3Contract.incremental, [totalEuroUlps, euroUlps]);
  }

  public approveTx(
    spender: BigNumber | string,
    amount: BigNumber,
    params?: ITxParams
  ): Promise<boolean> {
    return promisify(this.rawWeb3Contract.approve, [spender, amount, params]);
  }

  public createSnapshotTx(params?: ITxParams): Promise<BigNumber> {
    return promisify(this.rawWeb3Contract.createSnapshot, [params]);
  }

  public transferFromTx(
    from: BigNumber | string,
    to: BigNumber | string,
    amount: BigNumber,
    params?: ITxParams
  ): Promise<boolean> {
    return promisify(this.rawWeb3Contract.transferFrom, [from, to, amount, params]);
  }

  public setAccessPolicyTx(newPolicy: BigNumber | string, params?: ITxParams): Promise<void> {
    return promisify(this.rawWeb3Contract.setAccessPolicy, [newPolicy, params]);
  }

  public issueForEuroTx(euroUlps: BigNumber, params?: ITxParams): Promise<BigNumber> {
    return promisify(this.rawWeb3Contract.issueForEuro, [euroUlps, params]);
  }

  public transferTx(
    to: BigNumber | string,
    amount: BigNumber,
    params?: ITxParams
  ): Promise<boolean> {
    return promisify(this.rawWeb3Contract.transfer, [to, amount, params]);
  }

  public burnNeumarkTx(neumarkUlps: BigNumber, params?: ITxParams): Promise<BigNumber> {
    return promisify(this.rawWeb3Contract.burnNeumark, [neumarkUlps, params]);
  }

  public approveAndCallTx(
    spender: BigNumber | string,
    amount: BigNumber,
    extraData: string,
    params?: ITxParams
  ): Promise<boolean> {
    return promisify(this.rawWeb3Contract.approveAndCall, [spender, amount, extraData, params]);
  }

  public amendAgreementTx(agreementUri: string, params?: ITxParams): Promise<void> {
    return promisify(this.rawWeb3Contract.amendAgreement, [agreementUri, params]);
  }

  public enableTransferTx(enabled: boolean, params?: ITxParams): Promise<void> {
    return promisify(this.rawWeb3Contract.enableTransfer, [enabled, params]);
  }

  public reclaimTx(token: BigNumber | string, params?: ITxParams): Promise<void> {
    return promisify(this.rawWeb3Contract.reclaim, [token, params]);
  }
}

export default Contract;
