/* tslint:disable: only-arrow-functions ter-prefer-arrow-callback */

import * as chai from "chai";
import { parseStrToNumStrict } from "../../app/utils/utils";

describe("utils/utils.ts - parseStrToNumStrict", () => {
  it("should return Nan for null", function() {
    const parsed = parseStrToNumStrict(null);
    chai.assert.isNaN(parsed);
  });

  it("should return Nan for undefined", function() {
    const parsed = parseStrToNumStrict(undefined);
    chai.assert.isNaN(parsed);
  });

  it("should return Nan for empty string", function() {
    const parsed = parseStrToNumStrict("");
    chai.assert.isNaN(parsed);
  });

  it("should return number", function() {
    const parsed = parseStrToNumStrict("0");
    chai.assert.isFinite(parsed);
  });

  it("should handle negative numbers", function() {
    const parsed = parseStrToNumStrict("-1");
    chai.assert.isBelow(parsed, 0);
  });

  it("should handle dot and coma", function() {
    chai.assert.isFinite(parseStrToNumStrict("1.5"));
    chai.assert.isFinite(parseStrToNumStrict("1,5"));
  });

  it("should handle white space", function() {
    chai.assert.isFinite(parseStrToNumStrict("1 5"));
  });

  it("do not allow for double dot / coma", function() {
    chai.assert.isNaN(parseStrToNumStrict("1,5,5"));
    chai.assert.isNaN(parseStrToNumStrict("1,5,5"));
  });

  it("do not allow trailing string", function() {
    chai.assert.isNaN(parseStrToNumStrict("1,5aa"));
  });
});
