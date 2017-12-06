import promiseAll = require("promise-all");

import { AppState } from "../actions/constants";
import config from "../config";
import { EthToken } from "./contracts/EthToken";
import { EuroToken } from "./contracts/EuroToken";
import { LockedAccount } from "./contracts/LockedAccount";
import { Neumark } from "./contracts/Neumark";
import { PublicCommitment } from "./contracts/PublicCommitment";
import { Web3Service } from "./web3Service";

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

  const [neumarkAddress, etherLockAddress, euroLockAddress] = await Promise.all([
    publicCommitment.neumark,
    publicCommitment.etherLock,
    publicCommitment.euroLock,
  ]);

  [neumark, etherLock, euroLock] = await Promise.all([
    Neumark.createAndValidate(web3, neumarkAddress),
    LockedAccount.createAndValidate(web3, etherLockAddress),
    LockedAccount.createAndValidate(web3, euroLockAddress),
  ]);

  const [etherTokenAddress, euroTokenAddress] = await Promise.all([
    etherLock.assetToken,
    euroLock.assetToken,
  ]);

  const tokens = await promiseAll({
    etherToken: EthToken.createAndValidate(web3, etherTokenAddress),
    euroToken: EuroToken.createAndValidate(web3, euroTokenAddress),
  });

  etherToken = tokens.etherToken;
  euroToken = tokens.euroToken;
}
