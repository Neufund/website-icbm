import * as moment from "moment";
import promiseAll = require("promise-all");

import { IcoPhase } from "../actions/constants";
import config, { CommitmentType } from "../config";
import { etherToken, euroToken, neumark, publicCommitment } from "./contracts/ContractsRepository";
import { InternalCommitmentState } from "./contracts/PublicCommitment";

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
    euroEthRate,
    euroDecimals,
    ethDecimals,
    neuDecimals,
    ethEurFraction,
  } = await promiseAll({
    startingDate: publicCommitment.startOf(startingInternalState),
    finishDate: publicCommitment.startOf(finishingInternalState),
    minTicketEur: publicCommitment.minTicketEur,
    euroEthRate: publicCommitment.convertToEur(1),
    euroDecimals: euroToken.decimals,
    ethDecimals: etherToken.decimals,
    neuDecimals: neumark.decimals,
    ethEurFraction: publicCommitment.ethEurFraction,
  });

  const now = moment();
  const commitmentState = mapCurrentTimeToCommitmentState(startingDate, finishDate, now);

  const minTicketWei = minTicketEur.div(euroEthRate);

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
