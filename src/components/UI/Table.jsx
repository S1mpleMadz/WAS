import "./Table.scss";
import { useState } from "react";

export default function Table({
  columns,
  data,
  className = "",
  emptyMessage = "No data available",
  OnRowClick,
  selectedRow,
  OnUnSelect,
}) {
  const [internalSelectedRow, setInternalSelectedRow] = useState(selectedRow);

  const [lastSectedRow, setLastSelectedRow] = useState(false);

  const [lastSelectedIndex, setLastSelectedIndex] = useState(null);

  if (!data || data.length === 0) {
    return (
      <div className={`table-empty ${className}`}>
        <p>{emptyMessage}</p>
      </div>
    );
  }

  const handleRowClick = (rowIndex) => {
    console.log("this is the current selected row: " + internalSelectedRow);
    console.log("This is the last row" + lastSectedRow);
    console.log("The last index is " + lastSelectedIndex);
    console.log("We are attempting  to select " + rowIndex);
    if (OnRowClick && lastSectedRow == false) {
      OnRowClick(rowIndex);
      setInternalSelectedRow(rowIndex);
      // console.log("this is the current selected row: " + internalSelectedRow;
      setLastSelectedRow(true);
      setLastSelectedIndex(rowIndex);
    }
    if (rowIndex == lastSelectedIndex && lastSectedRow == true) {
      setInternalSelectedRow(null);
      setLastSelectedRow(false);
      OnUnSelect();
    }
  };

  const UnSelect = () => {
    // setInternalSelectedRow(null);
    console.log("We are unselcting");
  };

  return (
    <div className={`table-wrapper ${className}`}>
      <table className="reusable-table">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index} className={column.className || ""}>
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={row.id || rowIndex}
              onClick={() => handleRowClick(rowIndex)}
              className={internalSelectedRow === rowIndex ? "selected" : ""}
            >
              {columns.map((column, colIndex) => (
                <td key={colIndex} className={column.className || ""}>
                  {column.render ? column.render(row) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
