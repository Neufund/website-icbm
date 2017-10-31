import * as jQuery from "jquery";
import * as React from "react";

export const AfterMathComponent: React.SFC = () => {
  jQuery(".footer").removeClass("hidden"); // this has to be done this ugly way as footer is created outside of react app
  return <div>after math</div>;
};

export default AfterMathComponent;
