import React, { useState } from "react";
import "../../styles/NestedCheckBox.css";
import { updateCheckboxOption } from "../../constants/common";

const NestedCheckBox = ({ inputOptions = [] }) => {
  const [checkboxOptions, setCheckboxOptions] = useState(inputOptions);
  const [expanded, setExpanded] = useState({});
  const handleCheck = (path) => {
    setCheckboxOptions(updateCheckboxOption([...checkboxOptions], path));
  };

  const handleExpand = (event, path) => {
    event.stopPropagation();
    event.preventDefault();
    setExpanded((prev) => ({
      ...prev,
      [path]: !prev[path],
    }));
  };

  const getCheckBoxItems = (options, parentIndex = "") => {
    return options.map(
      ({ label = "", checked, options: nestedOptions }, index) => {
        return (
          <React.Fragment key={index}>
            <label
              htmlFor={`option-${parentIndex + index}`}
              className="nested-checkbox-item"
              style={{ marginLeft: `${parentIndex.split("-").length * 20}px` }}
            >
              {nestedOptions?.length > 0 && (
                <div
                  className="expand-icon"
                  onClick={(e) => handleExpand(e, `${parentIndex}-${index}`)}
                >
                  {expanded[`${parentIndex}-${index}`] ? "-" : "+"}
                </div>
              )}
              <input
                type="checkbox"
                id={`option-${parentIndex + index}`}
                className="nested-checkbox"
                checked={!!checked}
                onChange={() => handleCheck(`${parentIndex}-${index}`)}
              />
              {label}
            </label>
            <div
              className={`nested-checkbox-sub-outer-container ${
                expanded[`${parentIndex}-${index}`] ? "open" : ""
              }`}
            >
              {nestedOptions && nestedOptions.length > 0 && (
                <div className="nested-checkbox-sub-container">
                  {getCheckBoxItems(nestedOptions, `${parentIndex}-${index}`)}
                </div>
              )}
            </div>
          </React.Fragment>
        );
      }
    );
  };

  return (
    <div className="nested-checkbox-container">
      {getCheckBoxItems(checkboxOptions)}
    </div>
  );
};

export default NestedCheckBox;
