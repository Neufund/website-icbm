import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider, Store } from "react-redux";

import Curve from "./containers/Curve";
import { startup } from "./startup";

const render = (storage: Store<any>) => {
  const indexRoot = document.getElementById("react-root-curve");
  ReactDOM.render(
    <Provider store={storage}>
      <Curve />
    </Provider>,
    indexRoot
  );
};

// tslint:disable-next-line no-console - it's top level call if anything got here it should be printed
startup(render).catch(error => console.log(error));
