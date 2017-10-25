import { BigNumber } from "bignumber.js";
import { expect } from "chai";
import { bignumberToString } from "../../app/agreements/utils";

describe("Agreements utils", () => {
  describe("format big number string", () => {
    it("should format normal string correctly", () => {
      expect(bignumberToString("5.5")).to.be.eq("5.5");
    });

    it("should format string with scientific notation correctly", () => {
      const number = new BigNumber(10).pow(18);

      expect(bignumberToString("1e+18")).to.be.eq("1000000000000000000");
    });
  });
});
