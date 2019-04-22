import React from "react";
import PropTypes from "prop-types";

const IconDialog = ({ icon, text }) => {
  const iconClass =
    icon === "images-placeholder"
      ? "fa-images"
      : icon === "no-results"
      ? "fa-frown"
      : "";

  return (
    <div className="icon-dialog ">
      <i className={`fas ${iconClass}`} />
      <p className="text">{text}</p>
    </div>
  );
};

IconDialog.propTypes = {
  icon: PropTypes.oneOf(["images-placeholder", "no-results"]),
  text: PropTypes.string.isRequired
};

export default IconDialog;
