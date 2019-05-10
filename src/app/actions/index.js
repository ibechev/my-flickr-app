import * as types from "./types";
import { getImages } from "../utils/api";

export const action = (type, payload = null) => ({ type, payload });

/**
 *
 * @param {(Number|Object)} arg - Depends on how the tag is being removed
 */
export const removeTag = arg => action(types.REMOVE_TAG, arg);

export const removeAllTags = () => action(types.REMOVE_ALL_TAGS);

export const clearImages = () => action(types.CLEAR_IMAGES);

/**
 *
 * @param {string} inputValue
 */
export const addTag = inputValue => action(types.ADD_TAG, inputValue);

/**
 *
 * @param {[Sting]} tags
 */
export const addTags = tags => action(types.ADD_TAGS, tags);

export const fetchImagesAction = ({ type, payload = null, meta }) => async (
  dispatch,
  getStore
) => {
  dispatch(action(type, payload));

  const { page, tags } = getStore();

  await getImages({ page, tags })
    .then(result => {
      const { tags } = getStore();

      tags.length > 0
        ? dispatch(action(meta.success, result))
        : dispatch(action(types.RESET_STATE));
    })
    .catch(error => {
      dispatch(action(meta.error, error));
      if (DEVELOPMENT) throw new Error(error);
    });
};
