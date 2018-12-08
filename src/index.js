import "babel-polyfill";
import React from "react";
import { ReactDOM, render } from "react-dom";
import App from "./app/App";
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
  <App message="Hello, I'm React & Express boilerplate" />,
  document.getElementById("root")
);
