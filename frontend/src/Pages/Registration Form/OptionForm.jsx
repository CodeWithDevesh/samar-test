import React from "react";

const OptionForm = ({ques, options, value, setValue }) => {
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className="flex flex-col">
      <h3>{ques}</h3>
      {options.map((option, index) => (
        <label key={index}>
          <input
            type="radio"
            name="options"
            value={option}
            checked={value === option}
            onChange={handleChange}
          />
          {option}
        </label>
      ))}
    </div>
  );
};

export default OptionForm;
