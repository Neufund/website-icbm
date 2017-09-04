import { expect } from "chai";
import { shallow } from "enzyme";
import * as React from "react";

import { BlueHexagon, HexagonsStack, WhiteHexagon } from "../../app/components/HexagonsStack";

describe("<HexagonsStack />", () => {
  it("should render", () => {
    const component = shallow(
      <HexagonsStack>
        <div className="child" />
      </HexagonsStack>
    );
    expect(component).to.contain(BlueHexagon);
    expect(component).to.contain(WhiteHexagon);
    expect(component.find(".child")).to.have.length(1);
  });
});
