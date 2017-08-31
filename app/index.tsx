import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reduxLogger from "redux-logger";
import reduxThunk from "redux-thunk";
import Ico from "./containers/Ico";
// tslint:disable-next-line
import reducer from "./reducers/index";
import { loadIcoParamsFromContract } from "./web3/loadIcoParamsFromContract";

const root = document.getElementById("react-root");
// tslint:disable-next-line
const render = (store: any) => {
  /* We are doing this because we are not loading the "react-root"
  div in the following pages[whitepaper, faq, prodcut]
  */
  if (root) {
    ReactDOM.render(
      <Provider store={store}>
        <Ico />
      </Provider>,
      root
    );
  }
};

const enhancers = () => composeWithDevTools(applyMiddleware(reduxThunk, reduxLogger));

// Create the Redux store
const store = createStore(reducer, enhancers());

// Add development time features
if (process.env.NODE_ENV !== "production") {
  // Enable React Debug Tool
  // tslint:disable-next-line
  const ReactDebugTool = require('react-dom/lib/ReactDebugTool');
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
  require('!raw-loader!../dist/index.html');
  // tslint:disable-next-line
  require('!raw-loader!../dist/app.css');
}
Promise.resolve(loadIcoParamsFromContract("0xf2fdb660a74aed81ed4a306a25c0087d2c0ed224"))
  .then(value => console.log(value))
  .catch(error => console.log(error));
render(store);
