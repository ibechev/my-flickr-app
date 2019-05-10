// import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import Provider from "redhooks";
import { BrowserRouter, Route } from "react-router-dom";
import App from "./app/App";
import { store } from "./app/store";
import "./app/index.scss";

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Route
        path="/"
        exact
        render={props => {
          return <App {...props} />;
        }}
      />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
