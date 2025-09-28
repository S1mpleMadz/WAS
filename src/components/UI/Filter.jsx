import PropTypes from "prop-types";
import "./Filter.scss";

function Filter({ title, options, selectedOptions, onOptionChange, formatLabel }) {
  const handleChange = (option, isChecked) => {
    if (isChecked) {
      onOptionChange([...selectedOptions, option]);
    } else {
      onOptionChange(selectedOptions.filter((item) => item !== option));
    }
  };

  return (
    <div className="filter-section">
      <h3 className="title">{title}</h3>
      {options.map((option) => (
        <label key={option} className="checkbox-label">
          <input
            type="checkbox"
            checked={selectedOptions.includes(option)}
            onChange={(e) => handleChange(option, e.target.checked)}
          />
          <span>{formatLabel ? formatLabel(option) : option}</span>
        </label>
      ))}
    </div>
  );
}

Filter.propTypes = {
  title: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  selectedOptions: PropTypes.array.isRequired,
  onOptionChange: PropTypes.func.isRequired,
  formatLabel: PropTypes.func,
};

export default Filter;
