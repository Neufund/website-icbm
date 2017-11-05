/* tslint:disable:max-classes-per-file */

// @note: custom errors are erased when targeting ES5 so we needed to introduce our ErrorType enum

export enum ErrorType {
  UnknownError = "UnknownError",
  LedgerNotSupportedVersionError = "LedgerNotSupportedVersionError",
  LedgerNotAvailableError = "LedgerNotAvailableError",
  LedgerContractsOffError = "LedgerContractsOffError",
  LedgerTimeoutError = "LedgerTimeoutError",
  MissingContractError = "MissingContractError",
  ETHNodeConnectionError = "ETHNodeConnectionError",
  MismatchedNetworkError = "MismatchedNetworkError",
  NoInjectedWeb3Error = "NoInjectedWeb3Error",
  UserDeniedTransaction = "UserDeniedTransaction",
  NotEnoughFundsError = "NotEnoughFundsError",
}

export class NeufundError extends Error {
  constructor(public readonly type: ErrorType, public readonly message: string) {
    super(message);
  }
}

export class UnknownError extends NeufundError {
  constructor() {
    super(ErrorType.UnknownError, "Unknown error.");
  }
}

export class LedgerNotSupportedVersionError extends NeufundError {
  constructor(version: string) {
    super(ErrorType.LedgerNotSupportedVersionError, `Not supported Ledger version: ${version}.`);
  }
}

export class LedgerNotAvailableError extends NeufundError {
  constructor() {
    super(ErrorType.LedgerNotAvailableError, `Can't connect to Ledger.`);
  }
}

export class LedgerContractsOffError extends NeufundError {
  constructor() {
    super(ErrorType.LedgerContractsOffError, `Contract data in Ledger turned off.`);
  }
}

export class LedgerTimeoutError extends NeufundError {
  constructor() {
    super(ErrorType.LedgerTimeoutError, `Timeout on ledger.`);
  }
}

export class ETHNodeConnectionError extends NeufundError {
  constructor() {
    super(ErrorType.ETHNodeConnectionError, `Can't connect to Ethereum node.`);
  }
}

export class MissingContractError extends NeufundError {
  constructor(contractName: string, address: string) {
    super(
      ErrorType.MissingContractError,
      `Contract ${contractName} does not exists at ${address} address.`
    );
  }
}

export class MismatchedNetworkError extends NeufundError {
  constructor(networkName: string) {
    super(
      ErrorType.MismatchedNetworkError,
      `Your wallet is connected to wrong network: ${networkName}.`
    );
  }
}

export class NoInjectedWeb3Error extends NeufundError {
  constructor() {
    super(ErrorType.NoInjectedWeb3Error, `No injected Web3 was found.`);
  }
}

export class UserDeniedTransaction extends NeufundError {
  constructor() {
    super(ErrorType.UserDeniedTransaction, `Transaction was denied.`);
  }
}

export class NotEnoughFundsError extends NeufundError {
  constructor() {
    super(ErrorType.NotEnoughFundsError, `Not have enough funds on account.`);
  }
}
