import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";

import Curve from "./containers/Curve";
import muiTheme from "./muiTheme";

export const renderCurve = (storage: any) => {
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
