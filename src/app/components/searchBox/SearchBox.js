import React, { Component } from "react";
import PropTypes from "prop-types";
import onClickOutside from "react-onclickoutside";
import Tag from "../tag/Tag";

export class SearchBox extends Component {
  constructor(props) {
    super(props);

    this.addTag = this.addTag.bind(this);
    this.removeTag = this.removeTag.bind(this);
    this.removeAllTags = this.removeAllTags.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.searchBoxFocus = this.searchBoxFocus.bind(this);

    this.placeholder = "... Enter tags here. Separate with space or comma";
    this.input = React.createRef();
    this.searchButton = React.createRef();

    this.state = {
      tags: ["sky", "sea", "sunset"],
      error: undefined,
      inputIsEmpty: true,
      inFocus: true
    };
  }

  addTag(e) {
    let tagValue = "";
    const inputElement = this.input.current;

    if (e) {
      e.preventDefault();
      tagValue = e.target.value.trim();
    } else {
      tagValue = inputElement && inputElement.value.trim();
    }

    if (tagValue.length > 0) {
      this.setState(prevState => ({
        ...prevState,
        tags: [...prevState.tags, tagValue],
        inputIsEmpty: true
      }));

      inputElement.value = "";
    } else {
      inputElement && (inputElement.value = "");
    }
  }

  removeTag(e) {
    if (typeof e === "object") {
      const { value } = e.target;

      if (value.trim().length === 0 && this.state.tags.length) {
        this.setState(prevState => {
          const tempTags = prevState.tags;
          tempTags.length && tempTags.pop();

          return {
            ...prevState,
            tags: tempTags,
            inputIsEmpty: true
          };
        });
        e.target.value = "";
      }
    } else if (typeof e === "number") {
      this.setState(prevState => {
        const tempTags = prevState.tags;
        tempTags.splice(e, 1);
        return {
          ...prevState,
          tags: tempTags,
          inputIsEmpty: true
        };
      });
    }
  }

  removeAllTags() {
    this.state.tags.length &&
      this.setState(prevState => ({
        ...prevState,
        tags: []
      }));
  }

  handleKeyDown(e) {
    const {
      keyCode,
      target,
      target: { value }
    } = e;

    switch (keyCode) {
      case 13: // Enter
        this.handleSearch();
        break;

      case 32: // Space
      case 188: // Comma
        this.addTag(e);
        break;

      case 8: // Backspace
        this.removeTag(e);
        break;

      default:
        target.size = value.length > 3 ? value.length + 1 : 4;
    }
  }

  handleChange(e) {
    const { inputIsEmpty } = this.state;
    const isEmpty = !e.target.value;

    if (isEmpty !== inputIsEmpty) {
      this.setState(prevState => ({
        ...prevState,
        inputIsEmpty: isEmpty
      }));
    }
  }

  searchBoxFocus(e) {
    if (e.target !== this.searchButton.current) {
      this.setState(prevState => ({
        ...prevState,
        inFocus: true
      }));
      this.input.current.focus();
    }
  }

  handleClickOutside() {
    this.setState(prevState => ({
      ...prevState,
      inFocus: false
    }));
  }

  handleSearch() {
    const { tags } = this.state;
    tags.length && this.props.search(tags);
    this.input.current.blur();
    this.searchButton.current.blur();
  }

  render() {
    const { inFocus, tags, inputIsEmpty } = this.state;

    return (
      <section
        id="search-box"
        className={`search-box ${inFocus ? "focus" : ""}`}
        onClick={this.searchBoxFocus}
      >
        <section className="tags">
          <ul className="tags-wrapper">
            {tags.map((tag, i) => (
              <Tag key={i} index={i} value={tag} removeTag={this.removeTag} />
            ))}

            <li className="tags-input-wrapper">
              <input
                id="tags-input"
                type="text"
                className="tags-input"
                size="4"
                autoComplete="off"
                onKeyDown={this.handleKeyDown}
                onChange={this.handleChange}
                autoFocus
                ref={this.input}
              />
            </li>
          </ul>
          {!tags.length && inputIsEmpty && (
            <span className="placeholder">{this.placeholder}</span>
          )}
        </section>

        <section className="controls">
          <button className="clear" onClick={this.removeAllTags}>
            <i className="far fa-trash-alt" />
            Clear
          </button>
          <button
            className="search"
            onClick={this.handleSearch}
            ref={this.searchButton}
          >
            <i className="fas fa-search" />
            Search
          </button>
        </section>
      </section>
    );
  }
}

SearchBox.propTypes = {
  search: PropTypes.func.isRequired
};

export default onClickOutside(SearchBox);
