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

import { setErrorActionCreator } from "./actions/errorActions";
import reducers from "./reducers";
import { initRepository } from "./web3/contracts/ContractsRepository";
import { Web3Service } from "./web3/web3Service";

const persistStorePromised = promisify(persistStore) as any;

export async function startup(render: (store: Store<any>) => void) {
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

  await persistStorePromised(store, {
    whitelist: ["legalAgreementState"],
    storage: asyncSessionStorage,
  });

  try {
    await initRepository();
  } catch (e) {
    const errorMsg = (e as Error).message;
    let returnMsg;

    if (errorMsg.startsWith("Contract")) {
      returnMsg = "Cannot find deployed smart contracts";
    } else if (errorMsg.startsWith("Invalid JSON RPC response")) {
      returnMsg =
        "There is problem with connecting to Ethereum node please try again in few minutes";
    } else {
      returnMsg = "There is problem with with contract initialization: " + errorMsg;
    }

    store.dispatch(setErrorActionCreator(returnMsg));
  }
  render(store);
}
