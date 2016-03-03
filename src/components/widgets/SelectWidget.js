import React, { PropTypes } from "react";

import { asNumber } from "../../utils";


/**
 * This is a silly limitation in the DOM where option change event values are
 * always retrieved as strings.
 */
function processValue(type, value) {
  if (type === "boolean") {
    return value === "true";
  } else if (type === "number") {
    return asNumber(value);
  }
  return value;
}

function SelectWidget({
  schema,
  options,
  placeholder,
  value,
  defaultValue,
  required,
  multiple,
  onChange
}) {
  return (
    <select
      multiple={multiple}
      title={placeholder}
      value={value}
      defaultValue={defaultValue}
      onChange={(event) => {
        let newValue;
        if (multiple) {
          newValue = [];
          const options = event.target.options;
          for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
              newValue.push(options[i].value);
            }
          }
        } else {
          newValue = event.target.value;
        }

        onChange(processValue(schema.type, newValue));
      }}>{
      options.map((option, i) => {
        return <option key={i} value={option}>{String(option)}</option>;
      })
    }</select>
  );
}

if (process.env.NODE_ENV !== "production") {
  SelectWidget.propTypes = {
    schema: PropTypes.object.isRequired,
    options: PropTypes.array.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.any,
    defaultValue: PropTypes.any,
    required: PropTypes.bool,
    multiple: PropTypes.bool,
    onChange: PropTypes.func,
  };
}

export default SelectWidget;
