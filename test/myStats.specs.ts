import "mocha";
import myStatsReducer from "../src/reducers/myStats";

describe("my stats reducer", () => {
  it("does something", () => {
    const expected: any = {
      loading: false,
      address: null,
      addressFromWeb3: null,
      neumarkAmmount: null,
      weiAmmount: null
    };

    const actual = myStatsReducer(undefined, {});
  });
});
