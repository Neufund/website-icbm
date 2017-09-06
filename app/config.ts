import * as invariant from "invariant";
import * as moment from "moment";
import { AppState } from "./actions/constants";

interface IConfig {
  appState: AppState;
  announcedCfg?: IAnnouncedCfg;
  contractsDeployed?: IContractsDeployedIcoCfg;
}

interface IAnnouncedCfg {
  startingDate: moment.Moment;
}

interface IContractsDeployedIcoCfg {
  commitmentContractAddress: string;
  rpcProvider: string;
}

function getEnvValue(obj: any, key: string): string {
  if (obj[key] === undefined) {
    throw new Error(`${key} is not exists in .env file`);
  }
  return obj[key];
}

function loadConfig(): IConfig {
  const appState = getEnvValue(process.env, "APP_STATE") as AppState;

  switch (appState) {
    case AppState.BEFORE_ANNOUNCEMENT:
      return {
        appState,
      };
    case AppState.ANNOUNCED:
      const startingDate = moment(
        getEnvValue(process.env, "ANNOUNCED_ICO_START_DATE"),
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
      };
    case AppState.CONTRACTS_DEPLOYED: {
      return {
        appState,
        contractsDeployed: {
          commitmentContractAddress: getEnvValue(process.env, "COMMITMENT_CONTRACT_ADDRESS"),
          rpcProvider: getEnvValue(process.env, "RPC_PROVIDER"),
        },
      };
    }
    default:
      throw new Error("Unrecognized ico state!");
  }
}

export default loadConfig();
