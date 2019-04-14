import "babel-polyfill";
import React from "react";
import { ReactDOM, render } from "react-dom";
import Provider from "redhooks";
import App from "./app/App";
import { store } from "./app/store";
import "./app/index.scss";

//enable hot module replacement;
if (DEVELOPMENT) {
  if (module.hot) {
    // Setup hot module replacement
    module.hot.accept(App, () =>
      setImmediate(() => {
        ReactDOM.unmountComponentAtNode(document.getElementById("root"));
        render();
      })
    );
  }
}

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
