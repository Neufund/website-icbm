import { expect } from "chai";
import { mount, ReactWrapper } from "enzyme";
import * as moment from "moment";
import * as React from "react";
import * as sinon from "sinon";

import { Countdown, CountdownComponent } from "../../app/components/Countdown";
import { tid } from "../utils";

const MONTH_IN_SECONDS = 60 * 60 * 24 * 31;

describe("<Countdown />", () => {
  let sandbox: sinon.SinonSandbox;
  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    sandbox.useFakeTimers(); // this seems to not work correctly with moment if exact timestamp is provided
  });

  afterEach(() => {
    sandbox.verifyAndRestore();
  });

  it("should render and tick", () => {
    const finishDate = moment(MONTH_IN_SECONDS * 2, "X");

    const component = mount(<Countdown finishDate={finishDate} />);

    assertCountdownComponent(component, { days: "62", hours: "00", minutes: "00", seconds: "00" });

    sandbox.clock.tick(2000);
    component.update();

    assertCountdownComponent(component, { days: "61", hours: "23", minutes: "59", seconds: "58" });
  });

  it("should render zeroes if it's overdue", () => {
    const finishDate = moment(-1, "X");
    const component = mount(<Countdown finishDate={finishDate} />);
    assertCountdownComponent(component, { days: "00", hours: "00", minutes: "00", seconds: "00" });
  });

  describe("with callback", () => {
    it("should fire callback when 0 is reached", () => {
      const finishDate = moment(2, "X");
      const onFinishSpy = sandbox.spy();

      const component = mount(<Countdown finishDate={finishDate} onFinish={onFinishSpy} />);

      sandbox.clock.tick(2000);
      component.update();

      sandbox.clock.tick(2000);
      component.update();

      expect(onFinishSpy.calledOnce).to.be.true;
    });
  });
});

interface ICountdownComponents {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

function assertCountdownComponent(
  countdownComponent: ReactWrapper<any, any>,
  components: ICountdownComponents
) {
  const days = countdownComponent.find(tid("countdown-days")).text();
  const hours = countdownComponent.find(tid("countdown-hours")).text();
  const minutes = countdownComponent.find(tid("countdown-minutes")).text();
  const seconds = countdownComponent.find(tid("countdown-seconds")).text();

  expect(days).to.be.eq(components.days);
  expect(hours).to.be.eq(components.hours);
  expect(minutes).to.be.eq(components.minutes);
  expect(seconds).to.be.eq(components.seconds);
}
