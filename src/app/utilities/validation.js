/**
 *
 * @param {string} inputValue
 */
export const validateInput = (inputValue, tags) => {
  let error = "";

  if (typeof inputValue !== "string" && DEVELOPMENT)
    throw `Function 'validateInput' expects argument 'inputValue' to be string, but received ${typeof inputValue}`;

  if (tags.includes(inputValue)) error = "This tag already exist";
  return error;
};

/**
 *
 * @param {string[]} tags
 */
export const validateSearch = tags => {
  let error = "";

  if (!Array.isArray(tags) && DEVELOPMENT) {
    throw `Function 'validateSearch expects argument 'tags' to be an array, but received ${typeof tags}`;
  }

  if (!tags.length) error = "At least one tag is required";
  return error;
};
