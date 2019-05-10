import React, { createRef } from "react";
import renderer from "react-test-renderer";
import { SearchBox } from "../../src/app/components/searchBox/SearchBox";
import { propTypeErrors } from "../testUtils";
import { testTags } from "../testValues";
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
});
