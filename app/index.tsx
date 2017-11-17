import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider, Store } from "react-redux";

import App from "./containers/App";
import { renderCurve } from "./curve";
import { startup } from "./startup";

const render = (storage: Store<any>) => {
  const indexRoot = document.getElementById("react-root");

  ReactDOM.render(
    <Provider store={storage}>
      <App />
    </Provider>,
    indexRoot
  );

  renderCurve(storage);
};

// tslint:disable-next-line no-console - it's top level call if anything got here it should be printed
startup(render).catch(error => console.log(error));
