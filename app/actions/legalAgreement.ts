import { IStandardReduxAction } from "../types";
import { SET_LEGAL_AGREEMENTS_ACCEPTED } from "./constants";

export function legalAgreementsAcceptedAction(): IStandardReduxAction {
  return {
    type: SET_LEGAL_AGREEMENTS_ACCEPTED,
    payload: {},
  };
}
