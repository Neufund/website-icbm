import * as invariant from "invariant";
import * as moment from "moment";
import { AppState } from "./actions/constants";
import { IDictionary } from "./types";

interface IConfig {
  appState: AppState;
  announcedCfg?: IAnnouncedCfg;
  contractsDeployed?: IContractsDeployedIcoCfg;
}

export interface IAnnouncedCfg {
  showCountdownAfter?: moment.Moment;
  startingDate: moment.Moment;
}

export enum CommitmentType {
  WHITELISTED = "WHITELISTED",
  PUBLIC = "PUBLIC",
}

interface IContractsDeployedIcoCfg {
  commitmentContractAddress: string;
  rpcProvider: string;
  commitmentType: CommitmentType;
  gasLimit: string;
  gasPrice: string;
  ipfsNode: string;
  pdfRenderer: string;
  numberOfConfirmations: number;
  maxNumberBlocksToWait: number;
  defaultDerivationPath: string;
}

export function getRequiredValue(obj: any, key: string): string {
  if (obj[key] === undefined) {
    throw new Error(`'${key}' doesn't exist in .env file`);
  }
  return obj[key];
}

export function getRequiredDate(obj: any, key: string): moment.Moment {
  const date = moment(getRequiredValue(obj, key), moment.ISO_8601);

  invariant(date.isValid(), `${key} is not correctly formatted ISO string`);

  return date;
}

function loadConfig(environment: IDictionary): IConfig {
  // do not evaluate config during tests
  if (process.env.NODE_ENV === "test") {
    return {} as any;
  }
  const appState = getRequiredValue(environment, "APP_STATE") as AppState;

  switch (appState) {
    case AppState.BEFORE_ANNOUNCEMENT:
      return {
        appState,
      };
    case AppState.ANNOUNCED:
      const startingDate = getRequiredDate(environment, "ANNOUNCED_ICO_START_DATE");
      const showCountdownAfter = environment.SHOW_COUNTDOWN_AFTER
        ? getRequiredDate(environment, "SHOW_COUNTDOWN_AFTER")
        : null;

      return {
        appState,
        announcedCfg: {
          showCountdownAfter,
          startingDate,
        },
      };
    case AppState.CONTRACTS_DEPLOYED: {
      return {
        appState,
        contractsDeployed: {
          commitmentContractAddress: getRequiredValue(environment, "COMMITMENT_CONTRACT_ADDRESS"),
          rpcProvider: getRequiredValue(environment, "RPC_PROVIDER"),
          commitmentType: getRequiredValue(environment, "COMMITMENT_TYPE") as CommitmentType,
          gasPrice: getRequiredValue(environment, "GAS_PRICE"),
          gasLimit: getRequiredValue(environment, "GAS_LIMIT"),
          ipfsNode: "https://ipfs.io/",
          pdfRenderer: getRequiredValue(environment, "PDF_RENDERER"),
          numberOfConfirmations: 1, // if you set value > 1 then on dev network you will have to simulate traffic
          maxNumberBlocksToWait: 10,
          defaultDerivationPath: getRequiredValue(environment, "DEFAULT_DERIVATION_PATH"),
        },
      };
    }
    default:
      throw new Error("Unrecognized ico state!");
  }
}

export default loadConfig(process.env);
