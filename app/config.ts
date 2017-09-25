import * as BigNumber from "bignumber.js";
import * as invariant from "invariant";
import * as moment from "moment";
import { AppState } from "./actions/constants";

interface IConfig {
  appState: AppState;
  announcedCfg?: IAnnouncedCfg;
  contractsDeployed?: IContractsDeployedIcoCfg;
  transactionSigning: ITransactionSigning;
}

interface IAnnouncedCfg {
  startingDate: moment.Moment;
}

interface ITransactionSigning {
  numberOfConfirmations: number;
  maxNumberBlocksToWait: number;
}

const transactionSigningConfig = {
  numberOfConfirmations: 3, // TODO: this should react on type of network for dev value should be 1
  maxNumberBlocksToWait: 5,
};

export enum CommitmentType {
  WHITELISTED = "WHITELISTED",
  PUBLIC = "PUBLIC",
}

interface IContractsDeployedIcoCfg {
  commitmentContractAddress: string;
  neumarkContractAddress: string;
  etherContractAddress: string;
  euroContractAddress: string;
  euroLockAddress: string;
  etherLockAddress: string;
  rpcProvider: string;
  commitmentType: CommitmentType;
  ethEurRate: BigNumber.BigNumber;
}

export function getRequiredValue(obj: any, key: string): string {
  if (obj[key] === undefined) {
    throw new Error(`'${key}' doesn't exist in .env file`);
  }
  return obj[key];
}

function loadConfig(environment: object): IConfig {
  const appState = getRequiredValue(environment, "APP_STATE") as AppState;

  switch (appState) {
    case AppState.BEFORE_ANNOUNCEMENT:
      return {
        appState,
        transactionSigning: transactionSigningConfig,
      };
    case AppState.ANNOUNCED:
      const startingDate = moment(
        getRequiredValue(environment, "ANNOUNCED_ICO_START_DATE"),
        moment.ISO_8601
      );

      invariant(
        startingDate.isValid(),
        "ANNOUNCED_ICO_START_DATE is not correctly formatted ISO string"
      );

      return {
        appState,
        announcedCfg: {
          startingDate,
        },
        transactionSigning: transactionSigningConfig,
      };
    case AppState.CONTRACTS_DEPLOYED: {
      return {
        appState,
        contractsDeployed: {
          commitmentContractAddress: getRequiredValue(environment, "COMMITMENT_CONTRACT_ADDRESS"),
          neumarkContractAddress: getRequiredValue(environment, "NEUMARK_CONTRACT_ADDRESS"),
          etherContractAddress: getRequiredValue(environment, "ETH_CONTRACT_ADDRESS"),
          euroContractAddress: getRequiredValue(environment, "EURO_CONTRACT_ADDRESS"),
          etherLockAddress: getRequiredValue(environment, "ETH_LOCK_CONTRACT_ADDRESS"),
          euroLockAddress: getRequiredValue(environment, "EUR_LOCK_ADDRESS"),
          rpcProvider: getRequiredValue(environment, "RPC_PROVIDER"),
          commitmentType: getRequiredValue(environment, "COMMITMENT_TYPE") as CommitmentType,
          ethEurRate: new BigNumber.BigNumber(getRequiredValue(environment, "ETH_EUR_RATE")),
        },
        transactionSigning: transactionSigningConfig,
      };
    }
    default:
      throw new Error("Unrecognized ico state!");
  }
}

export default loadConfig(process.env);
