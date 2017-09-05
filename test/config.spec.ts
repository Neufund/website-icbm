import { expect } from "chai";

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
      ICO_START_DATE: "2017-9-15",
      RPC_PROVIDER: "http://localhost:8545",
    };
    const { commitmentContractAdress, commitmentStartDate, rpcProvider } = require("../app/config");
    expect(commitmentContractAdress).to.equal(process.env.COMMITMENT_CONTRACT_ADDRESS);
    expect(commitmentStartDate).to.equal(process.env.ICO_START_DATE);
    expect(rpcProvider).to.equal(process.env.RPC_PROVIDER);
  });

  it('Should throw error that "Key" is not exists', () => {
    process.env = {};
    expect(() => {
      require("../app/config");
    }).to.throw("COMMITMENT_CONTRACT_ADDRESS is not exists in .env file");
  });
});
