export const LOAD_ICO_PARAMS = "LOAD_ICO_PARAMS";

export const NEW_PHASE_ACTION = "NEW_PHASE";

export enum AppState {
  BEFORE_ANNOUNCEMENT = "BEFORE_ANNOUNCEMENT", // concrete date of ICO is not known, no contracts are deployed
  ANNOUNCED = "ANNOUNCED", // concrete date of ICO is known, but still no contracts on blockchain. Starting date is provided in env
  CONTRACTS_DEPLOYED = "CONTRACTS_DEPLOYED", // contracts are deployed. Get all data from blockchain and set exact phase based on the
}

// only used during CONTRACTS_DEPLOYED state
export enum IcoPhase {
  BEFORE_ICO = "BEFORE_ICO",
  DURING_ICO = "DURING_ICO",
  AFTER_ICO = "AFTER_ICO",
  UNKNOWN = "UNKNOWN",
}

export const LOAD_ICO_STATS = "LOAD_ICO_STATS";

export const SET_USER_ADDRESS = "SET_USER_ADDRESS";
export const SET_USER_LOADING = "SET_USER_LOADING";
export const SET_USER_COMITTMENT = "SET_USER_COMITTMENT";

export const COMMITING_STARTED = "COMMITING_STARTED";
export const COMMITING_TRANSACTION_SUBMITTED = "COMMITING_TRANSACTION_SUBMITTED";
export const COMMITING_DONE = "COMMITING_DONE";
export const COMMITING_ERROR = "COMMITING_ERROR";

export const SET_LEGAL_AGREEMENTS_ACCEPTED = "SET_LEGAL_AGREEMENTS_ACCEPTED";
