import PropTypes from "prop-types";
import "./ClearFilters.scss";

export default function ClearFilters({ onClear, hasActiveFilters, className = "" }) {
  return (
    <div className={`clear-filters ${className}`}>
      <button
        onClick={onClear}
        className="clear-button"
        disabled={!hasActiveFilters}
        type="button"
      >
        Clear Search & Filters
      </button>
    </div>
  );
}

ClearFilters.propTypes = {
  onClear: PropTypes.func.isRequired,
  hasActiveFilters: PropTypes.bool.isRequired,
  className: PropTypes.string,
};