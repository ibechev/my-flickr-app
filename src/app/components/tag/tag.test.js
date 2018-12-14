import React from "react";
import renderer from "react-test-renderer";
import Tag from "./Tag";
import { propTypeErrors } from "../../../../tests/testUtils";
import { mount } from "enzyme";

describe("Expect <Tag />", () => {
  const defaultProps = {
    index: 2,
    removeTag: () => {},
    value: "Tag name"
  };

  it("to render correctly", () => {
    const wrapper = renderer.create(<Tag {...defaultProps} />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });

  it("to not throw error with correct props", () => {
    propTypeErrors(<Tag {...defaultProps} />, defaultProps);
  });

  it("to call prop 'removeTag', when <button /> is clicked", () => {
    const testProps = {
      ...defaultProps,
      removeTag: jest.fn()
    };
    const wrapper = mount(<Tag {...testProps} />);
    wrapper.find("button").simulate("click");
    expect(wrapper.props().removeTag).toHaveBeenCalledTimes(1);
    expect(wrapper.props().removeTag).toHaveBeenCalledWith(testProps.index);
  });
});
