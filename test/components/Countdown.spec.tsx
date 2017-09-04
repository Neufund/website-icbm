import { expect } from "chai";
import { shallow } from "enzyme";
import * as moment from "moment";
import * as React from "react";

import { Countdown, CountdownComponent } from "../../app/components/Countdown";

describe("<Countdown />", () => {
  it("should render", () => {
    const start = moment("2017-09-15T14:49:32.154");
    const component = shallow(
      <Countdown finishDate={start}>
        <div className="child" />
      </Countdown>
    );
    expect(component).to.contain(CountdownComponent);
  });
});
