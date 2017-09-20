import { AppState } from "../../actions/constants";
import config from "../../config";
import web3Provider from "../web3Provider";
import EthToken from "./EthToken";
import EuroToken from "./EuroToken";
import LockedAccount from "./LockedAccount";
import Neumark from "./Neumark";
import PublicCommitment from "./PublicCommitment";

export let publicCommitment: PublicCommitment = null;
export let neumark: Neumark = null;
export let ethToken: EthToken = null;
export let euroToken: EuroToken = null;
export let ethLock: LockedAccount = null;
export let euroLock: LockedAccount = null;

export async function initRepository() {
  if (config.appState !== AppState.CONTRACTS_DEPLOYED) {
    return;
  }

  if (process.env.NODE_ENV === "development") {
    publicCommitment = await PublicCommitment.createAndValidate(
      web3Provider,
      config.contractsDeployed.commitmentContractAddress
    );

    neumark = await Neumark.createAndValidate(
      web3Provider,
      config.contractsDeployed.neumarkContractAddress
    );

    ethToken = await EthToken.createAndValidate(
      web3Provider,
      config.contractsDeployed.etherContractAddress
    );

    euroToken = await EuroToken.createAndValidate(
      web3Provider,
      config.contractsDeployed.euroContractAddress
    );

    ethLock = await LockedAccount.createAndValidate(
      web3Provider,
      config.contractsDeployed.etherLockAddress
    );

    euroLock = await LockedAccount.createAndValidate(
      web3Provider,
      config.contractsDeployed.euroLockAddress
    );
  }

  if (process.env.NODE_ENV === "production") {
    publicCommitment = new PublicCommitment(
      web3Provider,
      config.contractsDeployed.commitmentContractAddress
    );
    neumark = new Neumark(web3Provider, config.contractsDeployed.neumarkContractAddress);
    ethToken = new EthToken(web3Provider, config.contractsDeployed.etherContractAddress);
    euroToken = new EuroToken(web3Provider, config.contractsDeployed.euroContractAddress);
    ethLock = new LockedAccount(web3Provider, config.contractsDeployed.etherLockAddress);
    euroLock = new LockedAccount(web3Provider, config.contractsDeployed.euroLockAddress);
  }
}
