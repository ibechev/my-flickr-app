import React from "react";
import renderer from "react-test-renderer";
import { propTypeErrors } from "../../tests/config/testUtils";
import App from "./App";

describe("Expect <App />", () => {
  const defaultProps = {
    message: "Hey hey hey"
  };

  it("to render correctly", () => {
    const wrapper = renderer.create(<App {...defaultProps} />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });

  it("to not throw error with correct props", () => {
    propTypeErrors(<App {...defaultProps} />, defaultProps);
  });
});
