import React, { createRef } from "react";
import renderer from "react-test-renderer";
import { SearchBox } from "./SearchBox";
import { propTypeErrors } from "../../../../tests/testUtils";
import { testTags } from "../../../../tests/testValues";
import { mount } from "enzyme";

describe("Expect <SearchBox />", () => {
  const defaultProps = {
    inputValue: "",
    inputFocus: true,
    error: "",
    tags: [],
    refs: { searchBox: createRef(), inputEl: createRef() },
    searchBoxFocus: () => {},
    keyDown: () => {},
    addTag: () => {},
    change: () => {},
    search: () => {},
    removeTag: () => {},
    removeAllTags: () => {}
  };

  const setup = (props = {}) => {
    const wrapper = mount(<SearchBox {...defaultProps} {...props} />);
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
    const wrapper = setup(defaultProps);
    expect(wrapper.find("Tag")).toHaveLength(0);
  });

  it("to display number of <Tag /> components, equal of the number of tags in 'props.tags'", () => {
    const wrapper = setup({ tags: [...testTags] });
    expect(wrapper.find("Tag")).toHaveLength(testTags.length);
  });

  it("to display <span data-test='tags-placeholder' /> only, if 'props.tags' is empty and/or 'props.inputValue.length' eauals 0", () => {
    const testPropsOne = {
      tags: [...testTags]
    };
    const testPropsTwo = {
      inputValue: "abc"
    };
    const testPropsThree = {
      tags: [...testTags],
      inputValue: "abc"
    };
    const wrapper = setup();
    const wrapperOne = setup(testPropsOne);
    const wrapperTwo = setup(testPropsTwo);
    const wrapperThree = setup(testPropsThree);

    const spanName = "span[data-test='tags-placeholder']";

    expect(wrapper.find(spanName)).toHaveLength(1);
    expect(wrapperOne.find(spanName)).toHaveLength(0);
    expect(wrapperTwo.find(spanName)).toHaveLength(0);
    expect(wrapperThree.find(spanName)).toHaveLength(0);
  });

  it("to add class 'focus' to <section data-test='search-box' />, if 'props.inFocus' equals 'true'", () => {
    const wrapperWithFocus = setup();
    const wrapperWithoutFocus = setup({ inputFocus: false });

    const sectionName = "section[data-test='search-box']";
    const focusClass = "focus";

    expect(wrapperWithFocus.find(sectionName).hasClass(focusClass)).toEqual(
      true
    );
    expect(wrapperWithoutFocus.find(sectionName).hasClass(focusClass)).toEqual(
      false
    );
  });

  it("to display <span data-test='input-error' /> and the error text inside, only if 'props.error' is not an empty string", () => {
    const testProps = {
      error: "Some error message"
    };

    const wrapper = setup();
    const spanName = "span[data-test='input-error']";
    expect(wrapper.find(spanName)).toHaveLength(0);

    const wrapperWithError = setup(testProps);
    expect(wrapperWithError.find(spanName)).toHaveLength(1);
    expect(wrapperWithError.find(spanName).text()).toEqual(testProps.error);
  });

  it("to call 'props.removeAllTags', when <button dats-test='clear-tags' is clicked", () => {
    const removeAllTags = jest.fn();
    const wrapper = setup({ removeAllTags });

    wrapper.find("button[data-test='btn-clear-tags']").simulate("click");
    expect(removeAllTags).toHaveBeenCalledTimes(1);
  });

  it("to call 'props.addTag' only when 'props.inputValue' is not an empty string AND 'props.error' IS an empty string", () => {});

  describe("to call 'props.removeTag' only when", () => {
    it();
  });

  // it("to remove all tags when button 'Clear' is clicked", () => {
  //   const testState = {
  //     tags: [...testTags]
  //   };
  //   const wrapper = setup(defaultProps, testState);
  //   wrapper.find("button.clear").simulate("click");
  //   expect(wrapper.state("tags")).toHaveLength(0);
  // });

  // it("to add anothet tag when comma or space is pressed and the 'input' is not empty", () => {
  //   const testState = {
  //     tags: [...testTags]
  //   };
  //   const valueOne = "sandwich";
  //   const valueTwo = "alpha";
  //   const wrapper = setup(defaultProps, testState);
  //   const input = wrapper.find("input.tags-input");

  //   input.simulate("focus");
  //   input.simulate("keyDown", {
  //     keyCode: 32, // space
  //     target: { value: valueOne },
  //     preventDefault() {}
  //   });

  //   const tagsResultOne = [...wrapper.state("tags")];
  //   expect(tagsResultOne).toHaveLength(testState.tags.length + 1);
  //   expect(tagsResultOne.pop()).toEqual(valueOne);

  //   input.simulate("keyDown", {
  //     keyCode: 188, // comma
  //     target: { value: valueTwo },
  //     preventDefault() {}
  //   });

  //   const tagsResultTwo = [...wrapper.state("tags")];
  //   expect(tagsResultTwo).toHaveLength(testState.tags.length + 2);
  //   expect(tagsResultTwo.pop()).toEqual(valueTwo);
  // });

  // it("to set focus on the 'input' and set 'state.inFocus' to 'true' when user clicks on <section class='search-box'", () => {
  //   const wrapper = setup(defaultProps);
  //   wrapper.find("section.search-box").simulate("click", { target: {} });
  //   expect(wrapper.find("section.search-box").hasClass("focus")).toEqual(true);
  //   expect(wrapper.state("inFocus")).toEqual(true);
  // });

  // it("to remove single tag from 'state.tags', each time backspace is pressed", () => {
  //   const testState = {
  //     tags: [...testTags]
  //   };
  //   const wrapper = setup(defaultProps, testState);
  //   const input = wrapper.find("input.tags-input");

  //   input.simulate("focus");
  //   input.simulate("keyDown", {
  //     keyCode: 8, // backspace
  //     target: { value: "" }
  //   });
  //   const tagsResult = [...wrapper.state("tags")];
  //   expect(tagsResult).toHaveLength(testState.tags.length - 1);
  //   expect(tagsResult[0]).toEqual(testState.tags[0]);
  //   expect(tagsResult[1]).toEqual(testState.tags[1]);
  // });
});
