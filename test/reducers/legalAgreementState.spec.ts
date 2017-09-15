import { expect } from "chai";

import { SET_LEGAL_AGREEMENTS_ACCEPTED } from "../../app/actions/constants";
import legalAgreementState from "../../app/reducers/legalAgreementState";

describe("Legal agreement reducer", () => {
  it("should return initial values", () => {
    const newState = legalAgreementState(undefined, { type: "UNKNOWN ACTION", payload: null });

    expect(newState).to.be.deep.eq({ accepted: false });
  });

  it("should change state on SET_LEGAL_AGREEMENTS_ACCEPTED", () => {
    const newState = legalAgreementState({} as any, {
      type: SET_LEGAL_AGREEMENTS_ACCEPTED,
      payload: null,
    });

    expect(newState).to.be.deep.eq({ accepted: true });
  });
});
