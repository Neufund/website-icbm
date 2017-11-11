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
  WalletLockedError = "WalletLockedError",
  NoInjectedWeb3Error = "NoInjectedWeb3Error",
  UserDeniedTransaction = "UserDeniedTransaction",
  NotEnoughFundsError = "NotEnoughFundsError",
  TransactionFailedError = "TransactionFailedError",
  TransactionGasError = "TransactionGasError",
  LedgerLockedError = "LedgerLockedError",
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
    super(ErrorType.LedgerNotSupportedVersionError, `This version of Ledger Nano is not supported: ${version}.`);
  }
}

export class LedgerNotAvailableError extends NeufundError {
  constructor() {
    super(ErrorType.LedgerNotAvailableError, `Unfortunately we cannot connect to your Ledger Nano.`);
  }
}

export class LedgerContractsOffError extends NeufundError {
  constructor() {
    super(ErrorType.LedgerContractsOffError, `Contract data is turned off in the Ledger Nano, please enable it.`);
  }
}

export class LedgerTimeoutError extends NeufundError {
  constructor() {
    super(ErrorType.LedgerTimeoutError, `It seems there is a timeout on your Ledger Nano`);
  }
}

export class LedgerLockedError extends NeufundError {
  constructor() {
    super(ErrorType.LedgerLockedError, `Your Ledger Nano seems to be locked. Please insert the PIN.`);
  }
}

export class ETHNodeConnectionError extends NeufundError {
  constructor() {
    super(ErrorType.ETHNodeConnectionError, `Darn! We can not connect to the Ethereum node.`);
  }
}

export class MissingContractError extends NeufundError {
  constructor(contractName: string, address: string) {
    super(
      ErrorType.MissingContractError,
      `This contract ${contractName} does not exists under this ${address} address.`
    );
  }
}

export class MismatchedNetworkError extends NeufundError {
  constructor(networkName: string) {
    super(
      ErrorType.MismatchedNetworkError,
      `Your wallet is connected to the wrong network: ${networkName}. Please change the network.`
    );
  }
}

export class WalletLockedError extends NeufundError {
  constructor() {
    super(
      ErrorType.WalletLockedError,
      `Your wallet seems to be locked — we can't access any accounts.`
    );
  }
}

export class NoInjectedWeb3Error extends NeufundError {
  constructor() {
    super(ErrorType.NoInjectedWeb3Error, `We did not detect a Web3 wallet.`);
  }
}

export class UserDeniedTransaction extends NeufundError {
  constructor() {
    super(ErrorType.UserDeniedTransaction, `Ooops! Your transaction was denied.`);
  }
}

export class NotEnoughFundsError extends NeufundError {
  constructor() {
    super(ErrorType.NotEnoughFundsError, `You do not have enough funds in the selected wallet.`);
  }
}

export class TransactionFailedError extends NeufundError {
  constructor(txHash: string) {
    super(ErrorType.TransactionFailedError, `The transaction with hash ${txHash} has failed.`);
  }
}

// TODO: We could separate cases to much, to low gas but for now thats enough.
export class TransactionGasError extends NeufundError {
  constructor() {
    super(
      ErrorType.TransactionGasError,
      `There is a problem with the amount of gas supplied for the transaction.`
    );
  }
}
