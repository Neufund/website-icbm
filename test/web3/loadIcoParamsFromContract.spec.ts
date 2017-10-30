import { expect } from "chai";
import * as moment from "moment";

import { IcoPhase } from "../../app/actions/constants";
import { CommitmentType } from "../../app/config";
import { InternalCommitmentState } from "../../app/web3/contracts/PublicCommitment";
import {
  mapCommitmentTypeToFinishingInternalContractPhase,
  mapCommitmentTypeToStartingInternalContractPhase,
  mapCurrentTimeToCommitmentState,
} from "../../app/web3/loadIcoParamsFromContract";

describe("Load ICO params", () => {
  describe("mapCommitmentTypeToStartingInternalContractPhase", () => {
    it("should map correctly for WHITELISTED commitment", () => {
      const commitmentType = CommitmentType.WHITELISTED;
      expect(mapCommitmentTypeToStartingInternalContractPhase(commitmentType)).to.be.eq(
        InternalCommitmentState.WHITELIST
      );
    });

    it("should map correctly for PUBLIC commitment", () => {
      const commitmentType = CommitmentType.PUBLIC;
      expect(mapCommitmentTypeToStartingInternalContractPhase(commitmentType)).to.be.eq(
        InternalCommitmentState.PUBLIC
      );
    });
  });

  describe("mapCommitmentTypeToFinishingInternalContractPhase", () => {
    it("should map correctly for WHITELISTED commitment", () => {
      const commitmentType = CommitmentType.WHITELISTED;
      expect(mapCommitmentTypeToFinishingInternalContractPhase(commitmentType)).to.be.eq(
        InternalCommitmentState.PUBLIC
      );
    });

    it("should map correctly for PUBLIC commitment", () => {
      const commitmentType = CommitmentType.PUBLIC;
      expect(mapCommitmentTypeToFinishingInternalContractPhase(commitmentType)).to.be.eq(
        InternalCommitmentState.FINISHED
      );
    });
  });

  describe("mapCurrentTimeToCommitmentState", () => {
    it("should map correctly BEFORE ico", () => {
      const startDate = moment("2010-12-20");
      const finishDate = moment("2010-12-22");
      const now = moment("2010-12-19");

      expect(mapCurrentTimeToCommitmentState(startDate, finishDate, now)).to.be.eq(IcoPhase.BEFORE);
    });

    it("should map correctly DURING ico", () => {
      const startDate = moment("2010-12-20");
      const finishDate = moment("2010-12-22");
      const now = moment("2010-12-21");

      expect(mapCurrentTimeToCommitmentState(startDate, finishDate, now)).to.be.eq(IcoPhase.DURING);
    });

    it("should map correctly AFTER ico", () => {
      const startDate = moment("2010-12-20");
      const finishDate = moment("2010-12-22");
      const now = moment("2010-12-23");

      expect(mapCurrentTimeToCommitmentState(startDate, finishDate, now)).to.be.eq(IcoPhase.AFTER);
    });
  });
});
