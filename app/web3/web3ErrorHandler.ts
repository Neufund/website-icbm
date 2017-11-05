import * as neufundErrors from "../errors";
import { INanoLedgerError } from "../types";

export const web3ErrorHandler = (
  e: string & Error & INanoLedgerError
): neufundErrors.NeufundError => {
  // transaction rejected when using nano ledger
  if (e === "Invalid status 6985") {
    return new neufundErrors.UserDeniedTransaction();
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
