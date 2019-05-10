import React from "react";
import renderer from "react-test-renderer";
import App from "./App";
import { mount } from "enzyme";
import { image, testTags } from "../../tests/testValues";

describe("Expect <App />", () => {
  const defaultState = {
    page: 1,
    loading: false,
    fetchingMore: false,
    NoMorePages: false,
    noResults: false,
    images: [],
    tags: []
  };

  const setup = (stateTestProperties = {}) => {
    const wrapper = mount(<App />);
    wrapper.setState({ ...defaultState, ...stateTestProperties });
    return wrapper;
  };

  it.only("to render correctly", () => {
    // const wrapper = renderer.create(<App />).toJSON();
    // expect(wrapper).toMatchSnapshot();
  });

  it("to only display <ImageGallery />, if 'state.loading' is 'false' and 'state.noResults' is 'false'", () => {
    const wrapperOne = setup({ loading: true });
    expect(wrapperOne.find("ImageGallery")).toHaveLength(0);

    const wrapperTwo = setup({ noResults: true });
    expect(wrapperTwo.find("ImageGallery")).toHaveLength(0);

    const wrapperThree = setup({ loading: true, noResults: true });
    expect(wrapperThree.find("ImageGallery")).toHaveLength(0);

    const wrapper = setup(defaultState);
    expect(wrapper.find("ImageGallery")).toHaveLength(1);
  });

  it("to only display <span class='spinner-main' />, if 'state.loading' equals 'true'", () => {
    const wrapperOne = setup({ loading: true });
    expect(wrapperOne.find("span.spinner-main")).toHaveLength(1);

    const wrapper = setup();
    expect(wrapper.find("span.spinner-main")).toHaveLength(0);
  });

  it("to only display <span class='spinner-scroll' />, if 'state.images' is not empty, 'state.loading' is 'false', 'state.noResults' is 'false' and 'state.noMorePages' is 'false'", () => {
    const wrapperOne = setup({
      images: [image, image, image]
    });
    expect(wrapperOne.find("span.spinner-scroll")).toHaveLength(1);

    const wrapperTwo = setup({
      images: [image, image, image],
      loading: true
    });
    expect(wrapperTwo.find("span.spinner-scroll")).toHaveLength(0);

    const wrapperThree = setup({
      images: [image, image, image],
      noResults: true
    });
    expect(wrapperThree.find("span.spinner-scroll")).toHaveLength(0);

    const wrapperFour = setup({
      images: [image, image, image],
      noMorePages: true
    });
    expect(wrapperFour.find("span.spinner-scroll")).toHaveLength(0);
    const wrapperFive = setup({
      images: [image, image, image],
      noMorePages: true
    });
    expect(wrapperFive.find("span.spinner-scroll")).toHaveLength(0);

    const wrapperSix = setup({
      loading: true,
      noResults: true
    });
    expect(wrapperSix.find("span.spinner-scroll")).toHaveLength(0);

    const wrapperSeven = setup({
      loading: true,
      noResults: true,
      noMorePages: true
    });
    expect(wrapperSeven.find("span.spinner-scroll")).toHaveLength(0);

    const wrapperEight = setup({
      noResults: true,
      noMorePages: true
    });
    expect(wrapperEight.find("span.spinner-scroll")).toHaveLength(0);

    const wrapperNine = setup({
      loading: true,
      noMorePages: true
    });
    expect(wrapperNine.find("span.spinner-scroll")).toHaveLength(0);
  });

  it("to only display <div class='images-placeholder' />, if 'state.images' is empty, 'state.loading' is 'false' and 'state.noResults' is 'false'", () => {
    const wrapper = setup();
    expect(wrapper.find("div.images-placeholder")).toHaveLength(1);

    const wrapperOne = setup({ images: [image, image, image] });
    expect(wrapperOne.find("div.images-placeholder")).toHaveLength(0);

    const wrapperTwo = setup({
      images: [image, image, image],
      loading: true
    });
    expect(wrapperTwo.find("div.images-placeholder")).toHaveLength(0);

    const wrapperThree = setup({
      images: [image, image, image],
      loading: true,
      noResults: true
    });
    expect(wrapperThree.find("div.images-placeholder")).toHaveLength(0);

    const wrapperFour = setup({
      images: [image, image, image],
      noResults: true
    });
    expect(wrapperFour.find("div.images-placeholder")).toHaveLength(0);

    const wrapperFive = setup({
      noResults: true
    });
    expect(wrapperFive.find("div.images-placeholder")).toHaveLength(0);

    const wrapperSix = setup({
      loading: true
    });
    expect(wrapperSix.find("div.images-placeholder")).toHaveLength(0);

    const wrapperSeven = setup({
      loading: true,
      noResults: true
    });
    expect(wrapperSeven.find("div.images-placeholder")).toHaveLength(0);
  });
  it("to only display <div class='no-results-placeholder' />, if 'state.noResults' is 'true' and 'state.loading' is 'false'", () => {
    const wrapper = setup({ noResults: true });
    expect(wrapper.find("div.no-results-placeholder")).toHaveLength(1);

    const wrapperOne = setup({ noResults: true, loading: true });
    expect(wrapperOne.find("div.no-results-placeholder")).toHaveLength(0);

    const wrapperThree = setup({ loading: true });
    expect(wrapperThree.find("div.no-results-placeholder")).toHaveLength(0);
  });
});
