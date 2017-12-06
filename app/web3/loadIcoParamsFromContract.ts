import * as moment from "moment";
import promiseAll = require("promise-all");

import { IcoPhase } from "../actions/constants";
import config, { CommitmentType } from "../config";
import { InternalCommitmentState } from "./contracts/extensions/PublicCommitment";
import { etherToken, euroToken, neumark, publicCommitment } from "./ContractsRepository";
import { convertEurToEth } from "./utils";

export function mapCommitmentTypeToStartingInternalContractPhase(
  commitmentType: CommitmentType
): InternalCommitmentState {
  return commitmentType === CommitmentType.PUBLIC
    ? InternalCommitmentState.PUBLIC
    : InternalCommitmentState.WHITELIST;
}

export function mapCommitmentTypeToFinishingInternalContractPhase(
  commitmentType: CommitmentType
): InternalCommitmentState {
  return commitmentType === CommitmentType.PUBLIC
    ? InternalCommitmentState.FINISHED
    : InternalCommitmentState.PUBLIC;
}

export function mapCurrentTimeToCommitmentState(
  startDate: moment.Moment,
  finishDate: moment.Moment,
  now: moment.Moment
): IcoPhase {
  if (now.isBefore(startDate)) {
    return IcoPhase.BEFORE;
  } else if (now.isBefore(finishDate)) {
    return IcoPhase.DURING;
  } else {
    return IcoPhase.AFTER;
  }
}

export async function loadIcoParamsFromContract() {
  // we need to map internally used app commitment state to smart contracts internal state
  const startingInternalState = mapCommitmentTypeToStartingInternalContractPhase(
    config.contractsDeployed.commitmentType
  );
  const finishingInternalState = mapCommitmentTypeToFinishingInternalContractPhase(
    config.contractsDeployed.commitmentType
  );

  const {
    startingDate,
    finishDate,
    minTicketEur,
    euroDecimals,
    ethDecimals,
    neuDecimals,
    ethEurFraction,
  } = await promiseAll({
    startingDate: publicCommitment.startOfDate(startingInternalState),
    finishDate: publicCommitment.startOfDate(finishingInternalState),
    minTicketEur: publicCommitment.minTicketEur,
    euroDecimals: euroToken.decimals,
    ethDecimals: etherToken.decimals,
    neuDecimals: neumark.decimals,
    ethEurFraction: publicCommitment.ethEurFraction,
  });

  const now = moment();
  const commitmentState = mapCurrentTimeToCommitmentState(startingDate, finishDate, now);

  const minTicketWei = convertEurToEth(ethEurFraction, minTicketEur);

  return {
    commitmentState,
    euroDecimals,
    ethDecimals,
    neuDecimals,
    startingDate: startingDate.toISOString(),
    finishDate: finishDate.toISOString(),
    minTicketWei: minTicketWei.toString(),
    ethEurFraction: ethEurFraction.toString(),
  };
}
