import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";

import Curve from "./containers/Curve";
import muiTheme from "./muiTheme";
import { startup } from "./startup";
const render = (storage: any) => {
  const curveRoot = document.getElementById("react-root-curve");

  ReactDOM.render(
    <MuiThemeProvider muiTheme={muiTheme}>
      <Provider store={storage}>
        <Curve />
      </Provider>
    </MuiThemeProvider>,
    curveRoot
  );
};

// tslint:disable-next-line no-console - it's top level call if anything got here it should be printed
startup(render).catch(error => console.log(error));
