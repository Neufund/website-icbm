import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider, Store } from "react-redux";

import App from "./containers/App";
import { startup } from "./startup";

const render = (storage: Store<any>) => {
  const indexRoot = document.getElementById("react-root");

  ReactDOM.render(
    <Provider store={storage}>
      <App />
    </Provider>,
    indexRoot
  );
};

startup(render);
