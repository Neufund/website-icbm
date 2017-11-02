import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { browserHistory, Route, Router } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";
import { ToastContainer } from "react-toastify";

import AfterMathContainer from "./containers/AfterMathContainer";
import Commit from "./containers/Commit";
import muiTheme from "./muiTheme";
import { startup } from "./startup";

const render = (storage: any) => {
  const commitRoot = document.getElementById("react-root-commit");
  const history = syncHistoryWithStore(browserHistory, storage);

  ReactDOM.render(
    <MuiThemeProvider muiTheme={muiTheme}>
      <Provider store={storage}>
        <div data-test-id="commit-container">
          <ToastContainer
            position="top-right"
            autoClose={10000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            pauseOnHover
          />
          <Router history={history}>
            <Route path="/commit" component={Commit}>
              <Route path="aftermath" component={AfterMathContainer} />
            </Route>
          </Router>
        </div>
      </Provider>
    </MuiThemeProvider>,
    commitRoot
  );
};

// tslint:disable-next-line no-console - it's top level call if anything got here it should be printed
startup(render).catch(error => console.log(error));
