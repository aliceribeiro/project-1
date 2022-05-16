import "./styles.css";

export const Button = ({ text, handleClick, disabled }) => (
  <button className="button" disabled={disabled} onClick={handleClick}>
    {text}
  </button>
);
