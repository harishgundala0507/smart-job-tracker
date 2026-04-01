import { FiSearch } from 'react-icons/fi';
import './SearchBar.css';

const SearchBar = ({ value, onChange, placeholder = "Search by company or role..." }) => {
  return (
    <div className="search-bar-container">
      <FiSearch className="search-icon" />
      <input
        type="text"
        className="search-input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
