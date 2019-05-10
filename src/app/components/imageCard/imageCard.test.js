import React from "react";
import renderer from "react-test-renderer";
import ImageCard from "./ImageCard";
import { propTypeErrors } from "../../../../__tests__/testUtils";
import { image } from "../../../../__tests__/testValues";
import { shallow } from "enzyme";
import { formatTitle, formatDate } from "../../utils";

describe("Expect <ImageCard />", () => {
  const defaultProps = { ...image };

  it("to render correctly", () => {
    const wrapper = renderer.create(<ImageCard {...defaultProps} />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });

  it("to not throw error with correct prop types", () => {
    propTypeErrors(<ImageCard {...defaultProps} />, defaultProps);
  });

  it("to format the title with 'formatTitle()' utility method", () => {
    const wrapper = shallow(<ImageCard {...defaultProps} />);
    const formatedTitle = formatTitle(defaultProps.title);
    expect(
      wrapper
        .find(".header-info")
        .find("h6")
        .text()
    ).toEqual(formatedTitle);
  });

  it("to format the date with 'formatDate()' utility method", () => {
    const wrapper = shallow(<ImageCard {...defaultProps} />);
    const formatedDate = `taken on: ${formatDate(defaultProps.taken)}`;
    expect(
      wrapper
        .find(".header-info")
        .find("p")
        .at(1)
        .text()
    ).toEqual(formatedDate);
  });
});
