export const searchValidation = values => {
  let error = null;
  if (Array.isArray(values)) {
    console.log("values", values);
    if (!values.length) error = "At least one tag is required";
  } else {
    throw `searchValidation expects array, but received ${typeof values}`;
  }
  return error;
};
