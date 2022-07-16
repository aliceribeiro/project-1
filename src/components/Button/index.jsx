import P from 'prop-types';
import './styles.css';

export const Button = ({ text, handleClick, disabled = false }) => (
  <button className="button" disabled={disabled} onClick={handleClick}>
    {text}
  </button>
);

Button.defaultProps = {
  disabled: false,
};

Button.propTypes = {
  text: P.string.isRequired,
  handleClick: P.func.isRequired,
  disabled: P.bool,
};
