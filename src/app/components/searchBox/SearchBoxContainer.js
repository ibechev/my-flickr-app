import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { connect } from "redhooks";
import { validateInput, validateSearch } from "../../utilities/validation";
import {
  addTag,
  removeTag,
  removeAllTags,
  clearImages,
  fetchImagesAction
} from "../../actions/index";
import {
  START_SEARCH,
  SEARCH_COMPLETE,
  FETCH_IMAGES_ERROR
} from "../../actions/types";

import SearchBox from "./SearchBox";

const SearchBoxContainer = ({
  tags,
  addTag,
  removeTag,
  removeAllTags,
  clearImages,
  fetchImagesAction
}) => {
  const [inputValue, setInputValue] = useState("");
  const [inputFocus, setInputFocus] = useState(true);
  const [error, setError] = useState("");
  const refs = {
    searchBox: useRef(null),
    inputEl: useRef(null)
  };

  useEffect(() => {
    window.addEventListener("click", clickListener, false);

    return function clearEventListener() {
      window.removeEventListener("click", clickListener, false);
    };
  });

  /**
   * Equivalent to componentDidUpdate
   */
  const isMounted = useRef(false);
  useEffect(() => {
    // Prevent the execution of the functions on the first render
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      tags.length ? handleSearch(tags, error, setError) : clearImages();
    }
  }, [tags]);

  const handleSearch = (tags, error, setError) => {
    const tmpError = validateSearch(tags);

    if (tmpError) {
      setError(error);
      return;
    }

    // Clear old errors, if there are no new ones
    !tmpError.length && error.length && setError("");

    return (
      tags.length !== 0 &&
      fetchImagesAction({
        type: START_SEARCH,
        meta: {
          success: SEARCH_COMPLETE,
          error: FETCH_IMAGES_ERROR
        }
      })
    );
  };

  const handleKeyDown = e => {
    const { keyCode } = e;

    /**
     * If Space or Comma are pressed, add the input as a new tag
     */
    switch (keyCode) {
      case 32: // Space
      case 188: // Comma
        handleAddTag(e, inputValue.trim());
        break;

      case 8: // Backspace - remove tag
        !inputValue.trim().length && removeTag();
        break;

      default:
        /**
         * When typing and deleting letters increase
         * or decresce the size of the input element
         */
        adjustInputWidth(e.target, inputValue);
    }
  };

  const handleAddTag = (e, inputValue) => {
    e.preventDefault();
    const error = validateInput(inputValue, tags);

    if (error.length) {
      setError(error);
      return;
    }

    !error.length && error.length && setError("");

    if (inputValue.length) {
      addTag(inputValue);
      setInputValue("");
    }
  };

  const handleChange = e => {
    setInputValue(e.target.value.trim());
    !inputValue.length && !!error.length && setError("");

    // Change the size of the input element on text paste
    adjustInputWidth(e.target, inputValue);

    // Remove any existing error
    !!error.length && setError("");
  };

  const adjustInputWidth = (input, value) =>
    (input.size = value.length > 1 ? value.length + 2 : 4);

  const hanldeSearchBoxFocus = () => {
    if (!inputFocus) {
      setInputFocus(true);
    }
    refs.inputEl.current.focus();
  };

  const clickListener = e => {
    /**
     * Remove the focus from the input, if the click is outside the search box
     */
    if (!inputFocus) return;

    if (
      e.target !== refs.searchBox.current &&
      !refs.searchBox.current.contains(e.target)
    )
      setInputFocus(false);
  };

  return (
    <SearchBox
      inputValue={inputValue}
      inputFocus={inputFocus}
      error={error}
      tags={tags}
      refs={refs}
      searchBoxFocus={hanldeSearchBoxFocus}
      keyDown={handleKeyDown}
      addTag={handleAddTag}
      change={handleChange}
      search={handleSearch}
      removeTag={removeTag}
      removeAllTags={removeAllTags}
    />
  );
};

const mapStateToProps = ({ tags }) => ({
  tags
});

SearchBoxContainer.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
  fetchImagesAction: PropTypes.func.isRequired,
  addTag: PropTypes.func.isRequired,
  removeTag: PropTypes.func.isRequired,
  removeAllTags: PropTypes.func.isRequired,
  clearImages: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,

  { addTag, removeTag, removeAllTags, clearImages, fetchImagesAction }
)(SearchBoxContainer);
