import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import history from "./history";
import store from "./store";
import App from "./App";
import { GlobalProvider } from "./store/GlobalState";

ReactDOM.render(
  <GlobalProvider>
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  </GlobalProvider>,
  document.getElementById("app")
);
