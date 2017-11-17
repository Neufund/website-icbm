import { expect } from "chai";
import { shallow } from "enzyme";
import * as React from "react";
import { Line } from "react-chartjs-2";

import CurveChart, {
  formatNumber,
  getEtherDataset,
  getPrice,
} from "../../app/components/CurveChart";

describe("<CurveChart />", () => {
  it("should render", () => {
    const currencyRate: number = 0.0038119801;
    const initialReward: number = 6.5;
    const capNEU: number = 1500000000;

    const min: number = 0;
    const max: number = 1000000;
    const dotsNumber: number = 50;
    const currentRasiedEther: number = 0;

    const component = shallow(
      <CurveChart
        currencyRate={currencyRate}
        initialReward={initialReward}
        capNEU={capNEU}
        min={min}
        max={max}
        dotsNumber={dotsNumber}
        currentRasiedEther={currentRasiedEther}
      />
    );

    expect(component).to.have.descendants(Line);
  });
});

describe("helper functions", () => {
  describe("format numbers to milion and bilion test", () => {
    it("should return 1M", () => {
      const result = formatNumber(1000000);
      expect(result).to.equal("1.00M");
    });

    it("should return 2B", () => {
      const result = formatNumber(2000000000);
      expect(result).to.equal("2.00B");
    });

    it("should return 50K", () => {
      const result = formatNumber(50000);
      expect(result).to.equal("50.00K");
    });

    it("should return 2.00", () => {
      const result = formatNumber(2);
      expect(result).to.equal("2.00");
    });
  });

  describe("get the estimated reward price", () => {
    const currencyRate: number = 0.0038119801;
    const initialReward: number = 6.5;
    const capNEU: number = 1500000000;

    it("should return the value for 400000 ETH", () => {
      const result = getPrice(currencyRate, initialReward, capNEU, 400000);
      expect(result.toFixed(2)).to.equal("541.07");
    });
  });

  describe("gererate ether dataset", () => {
    it("should return array of 5 elements", () => {
      const min = 0;
      const max = 100;
      const limit = 5;
      const result = getEtherDataset(min, max, limit);
      const expected: number[] = [0, 20, 40, 60, 80];
      expect(result).to.deep.equal(expected);
    });

    it("should return empty array when min more than max", () => {
      const min = 100;
      const max = 10;
      const limit = 10;
      const result = getEtherDataset(min, max, limit);
      const expected: number[] = [];
      expect(result).to.deep.equal(expected);
    });
  });
});
