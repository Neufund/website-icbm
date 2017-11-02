/* tslint:disable:max-classes-per-file */

// @note: custom errors are erased on when targeting ES5 so we needed to introduce our ErrorType enum

export enum ErrorType {
  LedgerNotSupportedVersionError = "LedgerNotSupportedVersionError",
  LedgerNotAvailableError = "LedgerNotAvailableError",
  MissingContractError = "MissingContractError"
}

export class NeufundError extends Error {
  constructor(public readonly type: ErrorType, public readonly message:string) {
    super(message);
  }
}

export class LedgerNotSupportedVersionError extends NeufundError {
  constructor(version: string) {
    super(ErrorType.LedgerNotSupportedVersionError, `Not supported ledger version: ${version}`);
  }
}

export class LedgerNotAvailableError extends NeufundError {
  constructor() {
    super(ErrorType.LedgerNotAvailableError, `Can't connect to ledger!`);
  }
}

export class MissingContractError extends NeufundError {
  constructor(contractName: string, address: string) {
    super(ErrorType.MissingContractError, `Contract ${contractName} does not exists at ${address} address.`);
  }
}

