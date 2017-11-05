import * as neufundErrors from "../errors";
import { IMetamaskError, INanoLedgerError } from "../types";

export const web3ErrorHandler = (
  e: string & Error & IMetamaskError & INanoLedgerError
): neufundErrors.NeufundError => {
  // transaction rejected when using nano ledger
  if (e === "Invalid status 6985") {
    return new neufundErrors.UserDeniedTransaction();
  }

  // Invalid status 6801 error when ledger is blocked - it should be caught in provider

  // Not enough eth when using Nano Ledger
  if (
    e.code !== undefined &&
    e.message !== undefined &&
    e.code === -32010 &&
    e.message.startsWith("Insufficient funds. The account you tried to send transaction")
  ) {
    return new neufundErrors.NotEnoughFundsError();
  }

  // ledger contract data turned off
  if (e === "Invalid status 6a80") {
    return new neufundErrors.LedgerContractsOffError();
  }

  // ledger timeout
  if (e.errorCode !== undefined && e.errorCode === 5) {
    return new neufundErrors.LedgerTimeoutError();
  }

  // transaction rejected when using metamask
  if (
    e.message !== undefined &&
    e.message.startsWith("MetaMask Tx Signature: User denied transaction signature.")
  ) {
    return new neufundErrors.UserDeniedTransaction();
  }

  // transaction rejected when using parity
  if (e.message !== undefined && e.message.startsWith("Request has been rejected.")) {
    return new neufundErrors.UserDeniedTransaction();
  }

  return new neufundErrors.UnknownError();
};
