import React from "react";
import PropTypes from "prop-types";

const App = ({ message }) => {
  return (
    <div className="app">
      <h1>{message}</h1>
      <hr />
      <ul>
        <li>Express</li>
        <li>React</li>
        <li>Webpack</li>
        <li>HMR</li>
        <li>SCSS</li>
      </ul>
    </div>
  );
};

App.propTypes = {
  message: PropTypes.string.isRequired
};

export default App;
