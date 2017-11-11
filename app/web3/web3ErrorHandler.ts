import * as neufundErrors from "../errors";
import { IMetamaskError, INanoLedgerError } from "../types";

// Just to hide complicated if that covers three different cases
const checkGasProblem = (
  e: string & Error & IMetamaskError & INanoLedgerError & neufundErrors.NeufundError
): boolean => {
  return (
    e.code !== undefined &&
    e.message !== undefined &&
    ((e.code === -32000 && e.message === "intrinsic gas too low") ||
      (e.code === -32010 &&
        e.message.startsWith("Transaction gas is too low. There is not enough")) ||
      (e.code === -32010 && e.message.startsWith("exceeds current gas limit")))
  );
};

export const web3ErrorHandler = (
  e: string & Error & IMetamaskError & INanoLedgerError & neufundErrors.NeufundError
): neufundErrors.NeufundError => {
  // pass our own errors further
  if (e.type !== undefined) {
    return e;
  }

  // transaction rejected when using nano ledger
  if (e === "Invalid status 6985") {
    return new neufundErrors.UserDeniedTransaction();
  }

  if (checkGasProblem(e)) {
    return new neufundErrors.TransactionGasError();
  }

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
