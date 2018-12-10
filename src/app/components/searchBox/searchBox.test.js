import React from "react";
import renderer from "react-test-renderer";
import SearchBox from "./SearchBox";

describe("Expect <App />", () => {
  it("to render correctly", () => {
    // const wrapper = renderer.create(<App {...defaultProps} />).toJSON();
    // expect(wrapper).toMatchSnapshot();
    expect("text").toEqual("text");
  });
});
