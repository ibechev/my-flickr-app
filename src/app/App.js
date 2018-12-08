import React from "react";
import PropTypes from "prop-types";

const App = ({ message }) => {
  return (
    <div className="app">
      <h1>{message}</h1>
      <ul>
        <li>Express</li>
        <li>React</li>
        <li>Webpack</li>
        <li>HMR</li>
        <li>SCSS</li>
        <li>Jest</li>
        <li>Enzyme</li>
        <li>ESLint</li>
      </ul>
    </div>
  );
};

App.propTypes = {
  message: PropTypes.string.isRequired
};

export default App;
