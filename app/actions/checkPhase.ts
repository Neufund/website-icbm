import * as moment from "moment";
import { IcoParametersState, selectEndDate, selectStartDate } from "../reducers/icoParameters";
import { IcoPhase, NEW_PHASE_ACTION } from "./constants";

export function changePhaseAction(newPhase: IcoPhase) {
  return {
    type: NEW_PHASE_ACTION,
    payload: newPhase,
  };
}
export function checkPhase(icoParams: IcoParametersState) {
  const now = moment();

  const startDate = selectStartDate(icoParams);

  const endDate = selectEndDate(icoParams);

  if (now.isBefore(startDate)) {
    return IcoPhase.BEFORE_ICO;
  }
  if (now.isBefore(endDate)) {
    return IcoPhase.DURING_ICO;
  }
  return IcoPhase.AFTER_ICO;
}
