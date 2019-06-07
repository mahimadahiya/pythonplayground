import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { CookiesProvider } from "react-cookie";

import reducers from "./reducers";
import App from "./components/App";
import ErrorBoundary from "./components/HOC/ErrorBoundary";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <CookiesProvider>
    <Provider store={store}>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </Provider>
  </CookiesProvider>,
  document.getElementById("root")
);
