import React from "react";
import PropTypes from "prop-types";

const Tag = ({ index, removeTag, value }) => {
  const handleRemoveTag = () => {
    removeTag(index);
  };

  return (
    <li className="tag">
      <p className="tag-name">{value}</p>
      <button type="button" onClick={handleRemoveTag}>
        <i className="fas fa-trash-alt" />
      </button>
    </li>
  );
};

Tag.propTypes = {
  index: PropTypes.number.isRequired,
  removeTag: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};

export default Tag;
