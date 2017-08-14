import * as React from "react";
import * as ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import reduxLogger from "redux-logger";

import Countdown from "./containers/Countdown";

const root = document.getElementById("react-root");

const render = () => {
  ReactDOM.render(
    <div>
      <Countdown />
    </div>,
    root
  );
};

const enhancers = (routes: any) =>
  composeWithDevTools(applyMiddleware(thunkMiddleware, reduxLogger));

// Add development time features
if (process.env.NODE_ENV !== "production") {
  // Enable React Debug Tool
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
  require("!raw-loader!../dist/index.html");
  require("!raw-loader!../dist/app.css");
}

render();
