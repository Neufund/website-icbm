import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";

import Commit from "./containers/Commit";
import muiTheme from "./muiTheme";
import { startup } from "./startup";
import { initWeb3 } from "./web3/web3Provider";

const render = (storage: any) => {
  const commitRoot = document.getElementById("react-root-commit");

  ReactDOM.render(
    <MuiThemeProvider muiTheme={muiTheme}>
      <Provider store={storage}>
        <Commit />
      </Provider>
    </MuiThemeProvider>,
    commitRoot
  );
};

const start = async () => {
  await initWeb3();
  startup(render);
};

start();
