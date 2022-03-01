import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "store/store";
import { Toaster } from "react-hot-toast";
import ErrorBoundary from "components/ErrorBoudary/ErrorBoundary";
import App from "./App";
import "normalize.css";

ReactDOM.render(
  <ErrorBoundary>
    <BrowserRouter>
      <Provider store={store}>
        <App />
        <Toaster />
      </Provider>
    </BrowserRouter>
  </ErrorBoundary>,
  document.querySelector("#root")
);
