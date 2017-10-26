import * as Web3 from "web3";
import { config } from "../config";
import CommitmentModified from "./CommitmentModified";

before(async () => {
  const web3 = new Web3(new Web3.providers.HttpProvider(config.rpcProvider));
  web3.eth.defaultAccount = web3.eth.accounts[0];

  await contractRepository.init(web3, web3.eth.accounts[0]);
});

export class ContractRepository {
  public commitmentModified: CommitmentModified;
  public account: string;
  public web3: any;

  public async init(web3: any, account: string) {
    this.account = account;
    this.web3 = web3;
    this.commitmentModified = await CommitmentModified.createAndValidate(
      web3,
      "0xbe84036c11964e9743f056f4e780a99d302a77c4"
    );
  }
}

beforeEach(() => contractRepository.commitmentModified.reset());

export const contractRepository = new ContractRepository();
