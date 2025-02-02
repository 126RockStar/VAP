import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { App } from "./App";
import { store } from "./store";

// test purpose
import { mockBackend } from "./mockBackend";

mockBackend();

render(
  // subscribe app to store
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
);
