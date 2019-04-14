import React from "react";
import PropTypes from "prop-types";

const Button = React.forwardRef(({ className, children, ...rest }, ref) => (
  <button ref={ref} className={`btn ${className || ""}`.trim()} {...rest}>
    {children}
  </button>
));

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
};

export default Button;
