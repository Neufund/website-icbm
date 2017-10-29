import { expect } from "chai";
import * as moment from "moment";
import { checkIfCanShowCounter } from "../../app/containers/App";

describe("checkIfCanShowCounter", () => {
  it("should show counter if no config setup", () => {
    const now = moment.utc();
    expect(checkIfCanShowCounter(now, { startingDate: now })).to.be.eq(true);
  });

  it("should show counter if current date is after showCountdownAfter", () => {
    const now = moment("2010-12-20");
    const showCountdownAfter = moment("2010-12-19");

    expect(checkIfCanShowCounter(now, { showCountdownAfter, startingDate: now })).to.be.eq(true);
  });

  it("should not show counter if current date is before showCountdownAfter", () => {
    const now = moment("2010-12-20");
    const showCountdownAfter = moment("2010-12-21");

    expect(checkIfCanShowCounter(now, { showCountdownAfter, startingDate: now })).to.be.eq(false);
  });
});
