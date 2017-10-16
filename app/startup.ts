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

export async function startup(render: (store: Store<any>) => void) {
  const enhancers = () =>
    composeWithDevTools(compose(applyMiddleware(reduxThunk, reduxLogger), autoRehydrate()));

  // Create the Redux store
  const store = createStore(reducers, enhancers());
  await initWeb3(store);

  // Add development time features
  if (process.env.NODE_ENV !== "production") {
    // Enable React Debug Tool
    // tslint:disable-next-line
    const ReactDebugTool = require("react-dom/lib/ReactDebugTool");
    ReactDebugTool.beginProfiling();

    // Enable Webpack hot module replacement
    if ((module as any).hot) {
      // Replace reducers
      // (module as any).hot.accept('./reducers', () => {
      //   const newReducer = require('./reducers').default;
      //   store.replaceReducer(newReducer);
      // });
      // Replace routes and components
      // (module as any).hot.accept('./routes', () => {
      //   const newAppRoutes = require('./routes').default;
      //   // NOTE: We don't update the store middleWare,
      //   //       if you change routes you need to refresh.
      //   render(store, newAppRoutes);
      // });
    }

    // we require this files only to track changes in them automatically

    // tslint:disable-next-line
    require("!raw-loader!../dist/index.html");
    // tslint:disable-next-line
    require("!raw-loader!../dist/app.css");
  }

  persistStore(
    store,
    {
      whitelist: ["legalAgreementState"],
      storage: asyncSessionStorage,
    },
    () => initRepository().then(() => render(store))
  );
}
