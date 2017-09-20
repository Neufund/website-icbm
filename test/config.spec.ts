import { expect } from "chai";
import { AppState } from "../app/actions/constants";

describe("Config variables", () => {
  let savedEnvironment: any;

  beforeEach(() => {
    delete require.cache[require.resolve("../app/config")];
    savedEnvironment = process.env;

    process.env = {
      APP_STATE: AppState.BEFORE_ANNOUNCEMENT,
    };
  });

  afterEach(() => {
    process.env = savedEnvironment;
  });

  describe("get required value", () => {
    it("should get value", () => {
      const { getRequiredValue } = require("../app/config");

      const obj = {
        test: "1",
      };
      expect(getRequiredValue(obj, "test")).to.be.eq("1");
    });

    it("should throw error if missing", () => {
      const { getRequiredValue } = require("../app/config");

      const obj = {};
      expect(() => getRequiredValue(obj, "test")).to.throw("'test' doesn't exist in .env file");
    });
  });
});
