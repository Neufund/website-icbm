import * as BigNumber from "bignumber.js";
import { IcoPhase } from "../actions/constants";
import config, { CommitmentType } from "../config";
import { ICommitmentState } from "../reducers/commitmentState";
import { publicCommitment } from "./contracts/ContractsRepository";
import { InternalCommitmentState } from "./contracts/PublicCommitment";
import { asEtherNumber, asMomentDate } from "./utils";

export async function loadIcoParamsFromContract() {
  // we need to map internally used app commimtment state to smart contracts internal state
  //  @todo extract function
  const startingInternalState =
    config.contractsDeployed.commitmentType === CommitmentType.PUBLIC
      ? InternalCommitmentState.PUBLIC
      : InternalCommitmentState.WHITELIST;
  const finishingInternalState =
    config.contractsDeployed.commitmentType === CommitmentType.PUBLIC
      ? InternalCommitmentState.WHITELIST
      : InternalCommitmentState.FINISHED;

  const [internalCommitmentState, startingDate, finishDate, rate] = await Promise.all([
    publicCommitment.state,
    publicCommitment.startOf(startingInternalState),
    publicCommitment.startOf(finishingInternalState),
    publicCommitment.issuanceRate,
  ]);

  console.log("RATE: ", rate.toFixed());

  //  @todo extract function
  let commitmentState: IcoPhase;
  if (internalCommitmentState === InternalCommitmentState.BEFORE) {
    commitmentState = IcoPhase.BEFORE;
  } else if (internalCommitmentState === InternalCommitmentState.FINISHED) {
    commitmentState = IcoPhase.AFTER;
  } else {
    if (config.contractsDeployed.commitmentType === CommitmentType.PUBLIC) {
      commitmentState =
        internalCommitmentState === InternalCommitmentState.PUBLIC
          ? IcoPhase.DURING
          : IcoPhase.AFTER;
    } else {
      commitmentState =
        internalCommitmentState === InternalCommitmentState.PUBLIC
          ? IcoPhase.BEFORE
          : IcoPhase.DURING;
    }
  }

  return {
    commitmentState,
    startingDate: startingDate.toISOString(),
    finishDate: finishDate.toISOString(),
  };
}
