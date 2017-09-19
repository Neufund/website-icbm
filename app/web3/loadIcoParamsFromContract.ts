import * as BigNumber from "bignumber.js";
import * as moment from "moment";
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

  const [startingDate, finishDate] = await Promise.all([
    publicCommitment.startOf(startingInternalState),
    publicCommitment.startOf(finishingInternalState),
  ]);

  const now = moment();
  let commitmentState: IcoPhase;

  if (now.isBefore(startingDate)) {
    commitmentState = IcoPhase.BEFORE;
  } else if (now.isBefore(finishDate)) {
    commitmentState = IcoPhase.DURING;
  } else {
    commitmentState = IcoPhase.AFTER;
  }

  return {
    commitmentState,
    startingDate: startingDate.toISOString(),
    finishDate: finishDate.toISOString(),
  };
}
