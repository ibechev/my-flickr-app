import React from "react";
import renderer from "react-test-renderer";
import ImageGallery from "./ImageGallery";
import { propTypeErrors } from "../../../../tests/testUtils";
import { image } from "../../../../tests/testValues";
import { shallow } from "enzyme";

describe("Expect <ImageGallery />", () => {
  const defaultProps = {
    images: [image, image, image]
  };

  it("to render correctly", () => {
    const wrapper = renderer
      .create(<ImageGallery {...defaultProps} />)
      .toJSON();
    expect(wrapper).toMatchSnapshot();
  });

  it("to not throw error with correct props", () => {
    propTypeErrors(<ImageGallery {...defaultProps} />, defaultProps);
  });

  it("to have the corrent number of <ImageCard /> elements", () => {
    const wrapper = shallow(<ImageGallery {...defaultProps} />);
    expect(wrapper.find("ImageCard")).toHaveLength(defaultProps.images.length);
  });
});
