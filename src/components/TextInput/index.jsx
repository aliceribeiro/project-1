import P from 'prop-types';
import './styles.css';

export const TextInput = ({ handleChange, searchValue }) => {
  return (
    <input className="text-input" onChange={handleChange} value={searchValue} type="search" placeholder="Pesquisar" />
  );
};

TextInput.propTypes = {
  handleChange: P.func.isRequired,
  searchValue: P.string.isRequired,
};
