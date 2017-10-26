import { expect } from "chai";
import { shallow } from "enzyme";
import * as React from "react";

import { Field } from "redux-form";
import { LegalModal } from "../../app/components/LegalModal";
import { tid } from "../utils";

describe("<LegalModal />", () => {
  it("should render", () => {
    const props = {
      isAccepted: false,
      invalid: true,
    } as any;

    const component = shallow(<LegalModal {...props} />);

    expect(component.find(Field)).to.have.length(2);
    expect(component.find(tid("legal-modal-btn")).first()).to.have.prop("disabled", true);
  });
});
