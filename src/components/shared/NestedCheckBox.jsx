import React, { useState } from "react";
import "../../styles/NestedCheckBox.css";
import { updateCheckboxOption } from "../../constants/common";

const NestedCheckBox = ({ inputOptions = [] }) => {
  const [checkboxOptions, setCheckboxOptions] = useState(inputOptions);
  const handleCheck = (path) => {
    setCheckboxOptions(updateCheckboxOption([...checkboxOptions], path));
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
              <input
                type="checkbox"
                id={`option-${parentIndex + index}`}
                className="nested-checkbox"
                checked={!!checked}
                onChange={() => handleCheck(`${parentIndex}-${index}`)}
              />
              {label}
            </label>
            {nestedOptions && nestedOptions.length > 0 && (
              <div className="nested-checkbox-sub-container">
                {getCheckBoxItems(nestedOptions, `${parentIndex}-${index}`)}
              </div>
            )}
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
