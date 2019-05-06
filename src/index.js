// import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import Provider from "redhooks";
import App from "./app/App";
import { store } from "./app/store";
import "./app/index.scss";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
