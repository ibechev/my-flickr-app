import checkPropTypes from "check-prop-types";

export const findByTestAttr = (wrapper, att) => {
  const section = wrapper.find(`[data-test="${att}"]`);
  return section;
};

export const propTypeErrors = (component, expectedProps) => {
  const propTypeError = checkPropTypes(
    component.propTypes,
    expectedProps,
    "prop",
    component.name
  );
  expect(propTypeError).toBeUndefined();
};
