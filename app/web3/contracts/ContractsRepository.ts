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
export let etherToken: EthToken = null;
export let euroToken: EuroToken = null;
export let etherLock: LockedAccount = null;
export let euroLock: LockedAccount = null;

export async function initRepository() {
  if (config.appState !== AppState.CONTRACTS_DEPLOYED) {
    return;
  }

  publicCommitment = await PublicCommitment.createAndValidate(
    web3Provider,
    config.contractsDeployed.commitmentContractAddress
  );

  const neumarkAddress = await publicCommitment.neumark;
  neumark = await Neumark.createAndValidate(web3Provider, neumarkAddress);

  const etherLockAddress = await publicCommitment.etherLock;
  etherLock = await LockedAccount.createAndValidate(web3Provider, etherLockAddress);

  const euroLockAddress = await publicCommitment.euroLock;
  euroLock = await LockedAccount.createAndValidate(web3Provider, euroLockAddress);

  const etherTokenAddress = await etherLock.assetToken;
  etherToken = await EthToken.createAndValidate(web3Provider, etherTokenAddress);

  const euroTokenAddress = await euroLock.assetToken;
  euroToken = await EuroToken.createAndValidate(web3Provider, euroTokenAddress);
}
