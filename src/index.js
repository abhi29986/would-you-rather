import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import rootReducer from "./reducers";
import "bootstrap/dist/css/bootstrap.min.css";
import middleware from "./middleware";
import { Provider } from "react-redux";
import { createStore, compose } from "redux";

const store = createStore(
  rootReducer,
  compose(
    middleware,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
