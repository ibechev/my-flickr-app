import React from "react";
import PropTypes from "prop-types";

import Tag from "../tag/Tag";
import Button from "../button/Button";

export const SearchBox = ({
  inputFocus,
  inputValue,
  error,
  tags,
  refs,
  ...handle
}) => {
  const focusClass = inputFocus ? "focus" : "";
  const errorClass = error ? "error" : "";
  const placeholder = "... Enter tags here. Separate with space or comma";

  return (
    <section
      id="search-box"
      className={`search-box ${errorClass} ${focusClass}`}
      onClick={handle.searchBoxFocus}
      ref={refs.searchBox}
      data-test="search-box"
    >
      {error && (
        <span className="error" data-test="input-error">
          {error}
        </span>
      )}

      <form action="" onSubmit={e => handle.addTag(e, inputValue.trim())}>
        <section className="tags">
          <ul className="tags-wrapper">
            {tags.map((tag, i) => (
              <Tag
                key={tag}
                index={i}
                value={tag}
                removeTag={handle.removeTag}
              />
            ))}

            <li className="tags-input-wrapper">
              <input
                id="tags-input"
                type="text"
                className="tags-input"
                size="4"
                autoComplete="off"
                onKeyDown={handle.keyDown}
                onChange={handle.change}
                autoFocus
                ref={refs.inputEl}
                value={inputValue}
              />
            </li>
          </ul>

          {!tags.length && !inputValue.length && (
            <span className="placeholder" data-test="tags-placeholder">
              {placeholder}
            </span>
          )}
        </section>

        <section className="controls">
          <Button
            className="clear"
            onClick={handle.removeAllTags}
            title="Clear all tags"
            type="button"
            data-test="btn-clear-tags"
          >
            <i className="far fa-trash-alt" />
            Clear
          </Button>
        </section>
      </form>
    </section>
  );
};

SearchBox.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
  inputValue: PropTypes.string,
  inputFocus: PropTypes.bool.isRequired,
  error: PropTypes.string,
  refs: PropTypes.shape({
    searchBox: PropTypes.shape({
      current: PropTypes.node.isRequired.isRequired
    }).isRequired,
    inputEl: PropTypes.shape({
      current: PropTypes.node.isRequired.isRequired
    }).isRequired
  }),
  handle: PropTypes.shape({
    searchBoxFocus: PropTypes.func.isrequired,
    keyDown: PropTypes.func.isrequired,
    addTag: PropTypes.func.isrequired,
    change: PropTypes.func.isrequired,
    search: PropTypes.func.isrequired,
    removeTag: PropTypes.func.isrequired,
    removeAllTags: PropTypes.func.isrequired
  })
};

export default SearchBox;
