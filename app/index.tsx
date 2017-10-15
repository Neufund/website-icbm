import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider, Store } from "react-redux";
import App from "./containers/App";
import { startup } from "./startup";
import { initWeb3 } from "./web3/web3Provider";

const render = (storage: Store<any>) => {
  const indexRoot = document.getElementById("react-root");

  ReactDOM.render(
    <Provider store={storage}>
      <App />
    </Provider>,
    indexRoot
  );
};

const start = async () => {
  await initWeb3();
  startup(render);
};

start();
