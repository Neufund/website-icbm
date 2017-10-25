import { AppState } from "../../actions/constants";
import config from "../../config";
import { Web3Service } from "../web3Service";
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
  const web3 = Web3Service.instance.rawWeb3;

  publicCommitment = await PublicCommitment.createAndValidate(
    web3,
    config.contractsDeployed.commitmentContractAddress
  );

  const neumarkAddress = await publicCommitment.neumark;
  neumark = await Neumark.createAndValidate(web3, neumarkAddress);

  const etherLockAddress = await publicCommitment.etherLock;
  etherLock = await LockedAccount.createAndValidate(web3, etherLockAddress);

  const euroLockAddress = await publicCommitment.euroLock;
  euroLock = await LockedAccount.createAndValidate(web3, euroLockAddress);

  const etherTokenAddress = await etherLock.assetToken;
  etherToken = await EthToken.createAndValidate(web3, etherTokenAddress);

  const euroTokenAddress = await euroLock.assetToken;
  euroToken = await EuroToken.createAndValidate(web3, euroTokenAddress);
}
