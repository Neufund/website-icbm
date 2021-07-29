// tslint:disable-next-line:no-var-requires
require("core-js/es6/");
require("url-search-params-polyfill"); // this is solely for iPads

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

// tslint:disable-next-line no-console - it's top level call if anything got here it should be printed
startup(render).catch(error => console.log(error));
