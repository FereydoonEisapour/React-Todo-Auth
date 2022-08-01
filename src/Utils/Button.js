import PropTypes from "prop-types";

//import './Button.css';

const Button = ({ value, onClick, styleClass }) => (
  <button className={``} onClick={(event) => onClick(event)}>
    {value}
  </button>
);

Button.propTypes = {
  styleClass: PropTypes.string,
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

Button.defaultProps = {
  styleClass: "button",
};

export default Button;
