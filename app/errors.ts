/* tslint:disable:max-classes-per-file */
export class LedgerNotSupportedVersionError extends Error {
  constructor(public readonly version: string) {
    super(`Not supported ledger version: ${version}`);
  }
}

export class LedgerNotAvailableError extends Error {
  constructor() {
    super(`Can't connect to ledger!`);
  }
}

export class MissingContractError extends Error {
  constructor(public readonly msg: string) {
    super(msg);
  }
}
