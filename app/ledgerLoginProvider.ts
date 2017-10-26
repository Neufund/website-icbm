// import * as semver from "semver";

// const CHECK_INTERVAL = 1000;

// interface ILedgerConfig {
//   version: string;
//   arbitraryDataEnabled: boolean;
// }

// export class LedgerLoginProvider {
//   private connected: boolean;
//   private version: string;
//   private versionIsSupported: boolean;
//   private error: string;
//   private arbitraryDataEnabled: boolean;
//   private onConnectedCallbacks: Array<() => void>;
//   private onDisconnectedCallbacks: Array<() => void>;
//   private intervalId: number;
//   private isStarted: boolean;

//   constructor() {
//     this.connected = false;
//     this.version = null;
//     this.versionIsSupported = null;
//     this.error = null;
//     this.arbitraryDataEnabled = null;
//     this.onConnectedCallbacks = [];
//     this.onDisconnectedCallbacks = [];
//     this.intervalId = null;
//     this.isStarted = false;
//   }

//   /**
//    * Starts watching if ledger is connected/disconnected
//    */
//   public start() {
//     this.isStarted = true;
//     this.intervalId = setInterval(this.checkLedgerConnected.bind(this), CHECK_INTERVAL);
//   }

//   /**
//    * Stop watching if ledger is connected/disconnected
//    */
//   public stop() {
//     this.isStarted = false;
//     clearInterval(this.intervalId);
//   }

//   /**
//    * Waits until ledger is connected, or returns immediately if it is
//    */
//   public async waitUntilConnected(): Promise<any> {
//     if (this.connected) {
//       return;
//     }
//     return new Promise((resolve, _) => {
//       this.onConnectedCallbacks.push(resolve);
//     });
//   }

//   public onConnect(cb: () => void) {
//     if (this.connected) {
//       cb();
//     } else {
//       this.onConnectedCallbacks.push(cb);
//     }
//   }

//   public onDisconnect(cb: () => void) {
//     if (!this.connected) {
//       cb();
//     } else {
//       this.onDisconnectedCallbacks.push(cb);
//     }
//   }

//   private checkLedgerConnected() {
//     if (this.isStarted) {
//       ledger.getAppConfig((error: any, data: ILedgerConfig) => {
//         if (error) {
//           this.isDisconnected(error);
//         } else {
//           this.isConnected(data);
//         }
//       }, CHECK_INTERVAL / 2);
//     }
//   }

//   /**
//    * The ledger is connected
//    * @param config - ETH app config
//    */
//   private isConnected(config: ILedgerConfig) {
//     this.setConfig(config);
//     if (this.connected === false) {
//       this.handleConnected();
//     }
//   }

//   /**
//    * The ledger is disconnected
//    */
//   private isDisconnected(error: any) {
//     this.error = error;
//     if (this.connected === true) {
//       this.handleDisconnected();
//     }
//   }

//   /**
//    * The ledger was just connected
//    */
//   private handleConnected() {
//     this.connected = true;
//     this.executeCallbacks(this.onConnectedCallbacks);
//   }

//   /**
//    * The ledger was just disconnected
//    */
//   private handleDisconnected() {
//     ledger._accounts = null;
//     this.connected = false;
//     this.executeCallbacks(this.onDisconnectedCallbacks);
//   }

//   /**
//    * Executes all registered callbacks
//    */
//   private executeCallbacks(cbs: Array<() => void>) {
//     cbs.map(cb => cb());
//     cbs.length = 0;
//   }

//   /**
//    * Set ledger configuration
//    */
//   private setConfig({ version, arbitraryDataEnabled }: ILedgerConfig) {
//     this.version = version;
//     this.arbitraryDataEnabled = arbitraryDataEnabled;
//     this.versionIsSupported = semver.lt(version, "1.0.8");
//   }
// }

// export default new LedgerLoginProvider();
