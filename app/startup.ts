import { promisify } from "bluebird";
import { Store } from "react-redux";
import { browserHistory } from "react-router";
import { routerMiddleware } from "react-router-redux";
import { applyMiddleware, compose, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reduxLogger from "redux-logger";
import { autoRehydrate, persistStore } from "redux-persist";
import { asyncSessionStorage } from "redux-persist/storages";
import reduxThunk from "redux-thunk";

import { setFatalErrorActionCreator } from "./actions/fatalErrorActions";
import reducers, { IAppState } from "./reducers";
import { checkIfSupportedBrowser } from "./utils/utils";
import { initRepository } from "./web3/ContractsRepository";
import { Web3Service } from "./web3/web3Service";

const persistStorePromised = promisify(persistStore) as any;

export async function startup(render: (store: Store<IAppState>) => void) {
  const enhancers = () =>
    composeWithDevTools(
      compose(
        applyMiddleware(reduxThunk, reduxLogger, routerMiddleware(browserHistory)),
        autoRehydrate()
      )
    );

  // Create the Redux store
  const store = createStore(reducers, enhancers());
  Web3Service.init(store.dispatch, store.getState);

  // Add development time features
  if (process.env.NODE_ENV !== "production") {
    // we require this files only to track changes in them automatically
    // tslint:disable-next-line
    require("!raw-loader!../dist/index.html");
    // tslint:disable-next-line
    require("!raw-loader!../dist/app.css");
  }
  try {
    checkIfSupportedBrowser();

    await persistStorePromised(store, {
      whitelist: ["legalAgreementState"],
      storage: asyncSessionStorage,
    });

    await initRepository();
  } catch (e) {
    let returnMsg;
    const errorMsg = e.message;

    // existing e.type means it's our own error
    if (e.type !== undefined) {
      returnMsg = errorMsg;
    } else if (errorMsg.startsWith("Invalid JSON RPC response")) {
      returnMsg =
        "There is a problem with connecting to Ethereum node, please try again in few minutes";
    } else {
      returnMsg = "There is a problem with application startup: " + errorMsg;
    }

    store.dispatch(setFatalErrorActionCreator(returnMsg));
  }
  render(store);
}
