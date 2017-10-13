import * as Web3 from "web3";
import { config } from "../config";
import CommitmentModified from "./CommitmentModified";

before(async () => {
  const web3 = new Web3(new Web3.providers.HttpProvider(config.rpcProvider));
  web3.eth.defaultAccount = web3.eth.accounts[0];

  await contractRepository.init(web3);
});

export class ContractRepository {
  public commitmentModified: CommitmentModified;
  private web3: any;

  public async init(web3: any) {
    this.web3 = web3;
    this.commitmentModified = await CommitmentModified.createAndValidate(
      web3,
      "0xbe84036c11964e9743f056f4e780a99d302a77c4"
    );
  }
}

export const contractRepository = new ContractRepository();
