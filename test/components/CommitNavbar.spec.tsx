import { expect } from "chai";
import { shallow } from "enzyme";
import * as React from "react";

import { CancelCommit, CommitNavbar } from "../../app/components/CommitNavbar";

describe("<CommitNavbar />", () => {
  it("should render", () => {
    const component = shallow(
      <CommitNavbar>
        <div className="child" />
      </CommitNavbar>
    );
    expect(component).to.contain(CancelCommit);
  });
});
