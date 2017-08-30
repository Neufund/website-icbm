import { expect } from "chai";
import * as React from "react";

describe("Config variables", () => {
  let savedEnvs: any;

  beforeEach(() => {
    delete require.cache[require.resolve("../app/config")];
    savedEnvs = process.env;
    process.env = {};
  });

  afterEach(() => {
    process.env = savedEnvs;
  });

  it("Should load variables", () => {
    process.env = {
      COMMITMENT_CONTRACT_ADDRESS: "0x00000000000000000000000000000000000000000",
    };
    const { commitmentContractAdress } = require("../app/config");
    expect(commitmentContractAdress).to.equal(process.env.COMMITMENT_CONTRACT_ADDRESS);
  });

  it('Should throw error that "Key" is not exists', () => {
    process.env = {};
    expect(() => {
      const { commitmentContractAdress } = require("../app/config");
    }).to.throw("COMMITMENT_CONTRACT_ADDRESS is not exists in .env file");
  });
});
