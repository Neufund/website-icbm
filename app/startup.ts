import { Store } from "react-redux";
import { applyMiddleware, compose, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reduxLogger from "redux-logger";
import { autoRehydrate, persistStore } from "redux-persist";
import reduxThunk from "redux-thunk";

import { promisify } from "bluebird";
import { asyncSessionStorage } from "redux-persist/storages";
import { setEthNetworkAction } from "./actions/web3";
import reducers from "./reducers";
import { initRepository } from "./web3/contracts/ContractsRepository";
import { getNetworkId } from "./web3/utils";
import { Web3Service } from "./web3/web3Service";

const persistStorePromised = promisify(persistStore) as any;

export async function startup(render: (store: Store<any>) => void) {
  const enhancers = () =>
    composeWithDevTools(compose(applyMiddleware(reduxThunk, reduxLogger), autoRehydrate()));

  // Create the Redux store
  const store = createStore(reducers, enhancers());
  Web3Service.init(store.dispatch, store.getState);
  const networkId = await getNetworkId(Web3Service.instance.rawWeb3);
  store.dispatch(setEthNetworkAction(networkId));

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
  await initRepository();
  render(store);
}
