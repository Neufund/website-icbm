import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { browserHistory, EnterHook, IndexRedirect, Route, Router } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";
import { ToastContainer } from "react-toastify";

import { Store } from "redux";
import { TxConfirmation } from "./components/commitfunds/TxConfirmation";
import { TxStatus } from "./components/commitfunds/TxStatus";
import { WalletSelector } from "./components/walletSelector/WalletSelector";
import AfterMathContainer from "./containers/AfterMathContainer";
import { CommitLayout } from "./containers/CommitLayout";
import muiTheme from "./muiTheme";
import { IAppState } from "./reducers/index";
import { startup } from "./startup";

const render = (storage: Store<IAppState>) => {
  const commitRoot = document.getElementById("react-root-commit");
  const history = syncHistoryWithStore(browserHistory, storage);

  const onlyInitialized: EnterHook = (_, replace) => {
    const isInitialized = !storage.getState().commitmentState.loading;

    if (!isInitialized) {
      replace("/commit");
    }
  };

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
            <Route path="/commit" component={CommitLayout}>
              <IndexRedirect to="/commit/wallet-selector" />

              <Route path="wallet-selector" component={WalletSelector} />
              <Route path="tx-confirmation" component={TxConfirmation} onEnter={onlyInitialized} />
              <Route path="tx-status/:txHash" component={TxStatus} />
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
