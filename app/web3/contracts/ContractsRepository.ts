import config from "../../config";
import web3Provider from "../web3Provider";
import PublicCommitment from "./PublicCommitment";

export let publicCommitment: PublicCommitment = null;

export async function initRepository() {
  if (process.env.NODE_ENV === "development") {
    publicCommitment = await PublicCommitment.createAndValidate(
      web3Provider,
      config.contractsDeployed.commitmentContractAddress
    );
  }

  if (process.env.NODE_ENV === "production") {
    publicCommitment = new PublicCommitment(
      web3Provider,
      config.contractsDeployed.commitmentContractAddress
    );
  }
}
