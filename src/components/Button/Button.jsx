import PropTypes from "prop-types";

import s from "./Button.module.css";

const Button = ({ cn, type = "button", onClick, children }) => {
  const className = s[cn] || s.button;
  return (
    <button type={type} className={className} onClick={onClick}>
      {children}
    </button>
  );
};

Button.propTypes = {
  cn: PropTypes.string,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};

export default Button;
