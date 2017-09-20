import { expect } from "chai";
import { shallow } from "enzyme";
import * as React from "react";

import { CommitNavbar } from "../../app/components/commitfunds/CommitNavbar";

describe("<CommitNavbar />", () => {
  it("should render", () => {
    const message = "Hello you";
    const component = shallow(
      <CommitNavbar>
        <div className="child">
          {message}
        </div>
      </CommitNavbar>
    );
    expect(component.find(".child")).to.have.length(1);
  });
});
