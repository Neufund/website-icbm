import { delay, promisify } from "bluebird";
import ledgerWalletProvider from "ledger-wallet-provider";
import * as semver from "semver";
import * as Web3 from "web3";
import * as Web3ProviderEngine from "web3-provider-engine";
import * as RpcSubprovider from "web3-provider-engine/subproviders/rpc";
import { EthNetwork } from "./actions/constants";
import config from "./config";
import { getNetworkId } from "./web3/utils";
import { Web3Service } from "./web3/web3Service";

const CHECK_INTERVAL = 1000;
const CONNECTION_RETRY = 60;

interface ILedgerConfig {
  version: string;
  arbitraryDataEnabled: boolean;
}

export class LedgerService {
  public static async init(networkId: EthNetwork) {
    const { ledgerInstance, ledgerWeb3 } = await connectToLedger(networkId);

    LedgerService._instance = new LedgerService(ledgerInstance, ledgerWeb3);
  }

  public static async deinit() {
    LedgerService._instance = null;
  }

  private static _instance: LedgerService;

  public static get instance() {
    if (!LedgerService._instance) {
      throw new Error("LedgerService in not initialized!");
    }
    return LedgerService._instance;
  }

  private constructor(public readonly ledgerInstance: any, public readonly ledgerWeb3: any) {}

  public async getMultipleAccountsAsync(
    derivationPath: string,
    startingIndex: number,
    numberOfAddresses: number
  ): Promise<{ [derivationPath: string]: string }> {
    debugger;

    const getMultipleAccountsAsync = promisify<
      { [derivationPath: string]: string },
      string,
      number,
      number
    >(this.ledgerInstance.getMultipleAccounts, { context: this.ledgerInstance });

    return getMultipleAccountsAsync(derivationPath, startingIndex, numberOfAddresses);
  }
}

async function connectToLedger(networkId: EthNetwork) {
  const { ledgerInstance, ledgerWeb3 } = await createWeb3WithLedgerProvider(
    networkId,
    config.contractsDeployed.rpcProvider
  );

  let retry = CONNECTION_RETRY;
  while (retry > 0) {
    retry -= 1;

    try {
      const config = await getLedgerConfig(ledgerInstance);
      // todo check config version and if too small fails

      return { ledgerInstance, ledgerWeb3 };
    } catch (e) {}
    await delay(CHECK_INTERVAL);
  }

  console.error("Can't connect to ledger!");
  throw new Error("Can't connect to ledger!");
}

async function getLedgerConfig(ledgerInstance: any): Promise<ILedgerConfig> {
  return new Promise<ILedgerConfig>((resolve, reject) => {
    ledgerInstance
      .getAppConfig((error: any, data: ILedgerConfig) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      }, CHECK_INTERVAL / 2)
      .catch(reject);
  });
}

async function createWeb3WithLedgerProvider(networkId: number, rpcUrl: string) {
  const engine = new Web3ProviderEngine();
  const ledgerProvider = await ledgerWalletProvider(networkId);

  const ledgerInstance = ledgerProvider.ledger;

  engine.addProvider(ledgerProvider);
  engine.addProvider(
    new RpcSubprovider({
      rpcUrl,
    })
  );
  engine.start();

  return {
    ledgerInstance,
    ledgerWeb3: new Web3(engine),
  };
}
