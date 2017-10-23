import { Store } from "react-redux";
import { applyMiddleware, compose, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reduxLogger from "redux-logger";
import { autoRehydrate, persistStore } from "redux-persist";
import reduxThunk from "redux-thunk";

import { asyncSessionStorage } from "redux-persist/storages";
import reducers from "./reducers";
import { initRepository } from "./web3/contracts/ContractsRepository";
import { initWeb3 } from "./web3/web3Provider";
import { promisify } from "bluebird";

const persistStorePromised = promisify(persistStore) as any;

export async function startup(render: (store: Store<any>) => void) {
  const enhancers = () =>
    composeWithDevTools(compose(applyMiddleware(reduxThunk, reduxLogger), autoRehydrate()));

  // Create the Redux store
  const store = createStore(reducers, enhancers());
  await initWeb3(store.dispatch);

  // Add development time features
  if (process.env.NODE_ENV !== "production") {
    // Enable React Debug Tool
    // tslint:disable-next-line
    const ReactDebugTool = require("react-dom/lib/ReactDebugTool");
    ReactDebugTool.beginProfiling();

    // we require this files only to track changes in them automatically

    // tslint:disable-next-line
    require("!raw-loader!../dist/index.html");
    // tslint:disable-next-line
    require("!raw-loader!../dist/app.css");
  }

  await persistStorePromised(
    store,
    {
      whitelist: ["legalAgreementState"],
      storage: asyncSessionStorage,
    }
  );
  await initRepository();
  render(store)
}
