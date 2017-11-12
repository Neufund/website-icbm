import { Validator } from "redux-form";

const DERIVATION_PATH_REGEX = /^44'\/60'\/[0-9][0-9]?'\/$/m;

export const derivationPathValidator: Validator = value => {
  if (!DERIVATION_PATH_REGEX.test(value)) {
    return "Invalid derivation path!";
  }
};
