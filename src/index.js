import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { CookiesProvider } from "react-cookie";

import reducers from "./reducers";
import ErrorBoundary from "./components/HOC/ErrorBoundary";
import Loading from "./components/Elements/Loading";
const App = lazy(() => import("./components/App"));

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <CookiesProvider>
    <Provider store={store}>
      <ErrorBoundary>
        <Suspense fallback={<Loading />}>
          <App />
        </Suspense>
      </ErrorBoundary>
    </Provider>
  </CookiesProvider>,
  document.getElementById("root")
);
