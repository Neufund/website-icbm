/* tslint:disable: only-arrow-functions ter-prefer-arrow-callback */

import { expect } from "chai";
import { parseStrToNumStrict } from "../../app/utils/utils";

describe("utils", () => {
  describe("parseStrToNumStrict", () => {
    it("should return Nan for null", function() {
      expect(parseStrToNumStrict(null)).to.be.NaN;
    });

    it("should return Nan for undefined", function() {
      expect(parseStrToNumStrict(undefined)).to.be.NaN;
    });

    it("should return Nan for empty string", function() {
      expect(parseStrToNumStrict("")).to.be.NaN;
    });

    it("should return number", function() {
      expect(parseStrToNumStrict("0")).to.eq(0);
    });

    it("should handle negative numbers", function() {
      expect(parseStrToNumStrict("-1")).to.eq(-1);
    });

    it("should handle dot and comma", function() {
      expect(parseStrToNumStrict("1.5")).to.eq(1.5);
      expect(parseStrToNumStrict("1,5")).to.eq(1.5);
    });

    it("should handle white space", function() {
      expect(parseStrToNumStrict("1 5")).to.eq(15);
    });

    it("do not allow for double dot / comma", function() {
      expect(parseStrToNumStrict("1..55")).to.be.NaN;
      expect(parseStrToNumStrict("1,5,5")).to.be.NaN;
      expect(parseStrToNumStrict("1.5.5")).to.be.NaN;
      expect(parseStrToNumStrict("1.5,5")).to.be.NaN;
      expect(parseStrToNumStrict("1,5.5")).to.be.NaN;
    });

    it("do not allow trailing string", function() {
      expect(parseStrToNumStrict("1,5aa")).to.be.NaN;
    });
  });
});
