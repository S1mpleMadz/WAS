import PropTypes from "prop-types";
import "./Search.scss";

function Search({ searchQuery, onSearchChange, placeholder = "Search...", className = "" }) {
  return (
    <div className={`search-input ${className}`}>
      <input
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
}

Search.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
};

export default Search;
