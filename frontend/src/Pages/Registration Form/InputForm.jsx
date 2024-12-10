import React from "react";

const InputForm = ({ ques, value, setValue }) => {
  return (
    <div className="my-2">
      <h3>{ques}</h3>
      <input
        type="text"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      />
    </div>
  );
};

export default InputForm;
