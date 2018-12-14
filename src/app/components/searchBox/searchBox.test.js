import React from "react";
import renderer from "react-test-renderer";
import { SearchBox } from "./SearchBox";
import { propTypeErrors } from "../../../../tests/testUtils";
import { testTags } from "../../../../tests/testValues";
import { mount } from "enzyme";

describe("Expect <SearchBox />", () => {
  const defaultProps = {
    search: jest.fn()
  };

  const defaultState = {
    tags: [],
    inputIsEmpty: true,
    inFocus: true,
    error: null
  };

  const setup = (props, state) => {
    const wrapper = mount(<SearchBox {...props} />);
    wrapper.setState({ ...state });
    return wrapper;
  };

  it("to render correctly", () => {
    const wrapper = renderer.create(<SearchBox {...defaultProps} />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });

  it("to not throw error with correct props", () => {
    propTypeErrors(<SearchBox {...defaultProps} />, defaultProps);
  });

  it("to not display any <Tag /> conponent, if 'state.tags' is empty", () => {
    const wrapper = setup(defaultProps, defaultState);
    expect(wrapper.find("Tag")).toHaveLength(0);
  });

  it("to display number of <Tag /> components, equal of the number of tags in 'state.tags'", () => {
    const testState = {
      ...defaultState,
      tags: [...testTags]
    };
    const wrapper = setup(defaultProps, testState);
    expect(wrapper.find("Tag")).toHaveLength(testTags.length);
  });

  it("to display <span class='placeholder' /> only, if 'state.tags' is empty and 'stat.inputIsEmpty' eauals 'true'", () => {
    const testStateOne = {
      ...defaultState,
      tags: [...testTags]
    };
    const testStateTwo = {
      ...defaultState,
      inputIsEmpty: false
    };
    const testStateThree = {
      ...defaultState,
      inputIsEmpty: true,
      tags: [...testTags]
    };
    const wrapper = setup(defaultProps, defaultState);
    const wrapperOne = setup(defaultProps, testStateOne);
    const wrapperTwo = setup(defaultProps, testStateTwo);
    const wrapperThree = setup(defaultProps, testStateThree);

    expect(wrapper.find("span.placeholder")).toHaveLength(1);
    expect(wrapperOne.find("span.placeholder")).toHaveLength(0);
    expect(wrapperTwo.find("span.placeholder")).toHaveLength(0);
    expect(wrapperThree.find("span.placeholder")).toHaveLength(0);
  });

  it("to add class 'focus' to <section class='search-box' />, if 'state.inFocus' equals 'true'", () => {
    const wrapper = setup(defaultProps, defaultState);
    expect(wrapper.find("section.search-box").hasClass("focus")).toEqual(true);
  });

  it("to not add class 'focus' to <section class='search-box' />, if 'state.inFocus' equals 'false'", () => {
    const testState = {
      ...defaultState,
      inFocus: false
    };
    const wrapper = setup(defaultProps, testState);
    expect(wrapper.find("section.search-box").hasClass("focus")).toEqual(false);
  });

  it("to display <span class='error' /> and the error text inside, if 'state.error' is not 'null'", () => {
    const testState = {
      ...defaultState,
      error: "Some error mess"
    };
    const wrapper = setup(defaultProps, testState);
    expect(wrapper.find("span.error")).toHaveLength(1);
    expect(wrapper.find("span.error").text()).toEqual(testState.error);
  });

  it("to not display <span class='error', if 'state.error' is 'null'", () => {
    const wrapper = setup(defaultProps, defaultState);
    expect(wrapper.find("span.error")).toHaveLength(0);
  });

  it("to remove all tags when button 'Clear' is clicked", () => {
    const testState = {
      ...defaultState,
      tags: [...testTags]
    };
    const wrapper = setup(defaultProps, testState);
    wrapper.find("button.clear").simulate("click");
    expect(wrapper.state("tags")).toHaveLength(0);
  });

  it("to add anothet tag when comma or space is pressed and the 'input' is not empty", () => {
    const testState = {
      ...defaultState,
      tags: [...testTags]
    };
    const valueOne = "sandwich";
    const valueTwo = "alpha";
    const wrapper = setup(defaultProps, testState);
    const input = wrapper.find("input.tags-input");

    input.simulate("focus");
    input.simulate("keyDown", {
      keyCode: 32, // space
      target: { value: valueOne },
      preventDefault() {}
    });

    const tagsResultOne = [...wrapper.state("tags")];
    expect(tagsResultOne).toHaveLength(testState.tags.length + 1);
    expect(tagsResultOne.pop()).toEqual(valueOne);

    input.simulate("keyDown", {
      keyCode: 188, // comma
      target: { value: valueTwo },
      preventDefault() {}
    });

    const tagsResultTwo = [...wrapper.state("tags")];
    expect(tagsResultTwo).toHaveLength(testState.tags.length + 2);
    expect(tagsResultTwo.pop()).toEqual(valueTwo);
  });

  it("to set focus on the 'input' and set 'state.inFocus' to 'true' when user clicks on <section class='search-box'", () => {
    const wrapper = setup(defaultProps, defaultState);
    wrapper.find("section.search-box").simulate("click", { target: {} });
    expect(wrapper.find("section.search-box").hasClass("focus")).toEqual(true);
    expect(wrapper.state("inFocus")).toEqual(true);
  });

  it("to remove single tag from 'state.tags', each time backspace is pressed", () => {
    const testState = {
      ...defaultState,
      tags: [...testTags]
    };
    const wrapper = setup(defaultProps, testState);
    const input = wrapper.find("input.tags-input");

    input.simulate("focus");
    input.simulate("keyDown", {
      keyCode: 8, // backspace
      target: { value: "" }
    });
    const tagsResult = [...wrapper.state("tags")];
    expect(tagsResult).toHaveLength(testState.tags.length - 1);
    expect(tagsResult[0]).toEqual(testState.tags[0]);
    expect(tagsResult[1]).toEqual(testState.tags[1]);
  });

  it("to set 'state.error' to a string, if <button class='search' /> is pressed and 'state.tags' is empty", done => {
    const wrapper = setup(defaultProps, defaultState);
    wrapper.find("button.search").simulate("click");
    setTimeout(() => {
      expect(typeof wrapper.state("error")).toEqual("string");
      done();
    }, 0);
  });
});
